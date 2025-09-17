import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from 'src/users/models/user.model';
import { ConfigService } from '@nestjs/config';
import { RoleModel } from 'src/roles/models/role.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel) private readonly users: typeof UserModel,
    @InjectModel(RoleModel) private readonly roles: typeof RoleModel,
    private readonly jwt: JwtService,
    private readonly cfg: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    const existingEmail = await this.users.findOne({
      where: { email: dto.email },
    });
    const existingUsername = await this.users.findOne({
      where: { username: dto.username },
    });
    const existingPhone = await this.users.findOne({
      where: { phone_number: dto.phone_number },
    });

    if (existingEmail)
      throw new ConflictException(
        'Пользователь с таким email уже зарегистрирован',
      );
    if (existingUsername)
      throw new ConflictException(
        'Пользователь с таким username уже зарегистрирован',
      );
    if (existingPhone)
      throw new ConflictException(
        'Пользователь с таким телефоном уже зарегистрирован',
      );

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.users.create({
      name: dto.name,
      surname: dto.surname,
      username: dto.username,
      phone_number: dto.phone_number,
      email: dto.email,
      password: hashedPassword,
      city: dto.city,
    });

    const baseRole = await this.roles.findOne({ where: { name: 'user' } });
    if (!user.id) {
      throw new UnauthorizedException('Некорректный пользователь');
    }
    if (baseRole?.id) {
      await user.$add('roles', baseRole.id);
    }

    const withRoles = await this.users.findByPk(user.id, {
      include: [RoleModel],
    });
    if (!withRoles)
      throw new UnauthorizedException('Пользователь не найден после создания');

    const roles = (withRoles.roles ?? []).map((r) => r.name);

    // Проверяем, что user.id определён
    if (!user.id) throw new UnauthorizedException('Некорректный пользователь');

    const tokens = await this.signTokens(user.id, user.email, roles);
    await this.setRefreshHash(user.id, tokens.refresh);

    return { user: withRoles.toJSON(), ...tokens };
  }

  async login(dto: LoginDto) {
    const user = await this.users.findOne({
      where: { email: dto.email },
      include: [RoleModel],
      attributes: { include: ['password'] },
    });
    if (!user) throw new UnauthorizedException('Неверный логин или пароль');

    if (!user.password || typeof user.password !== 'string') {
      throw new UnauthorizedException(
        'Ошибка: отсутствует пароль у пользователя',
      );
    }

    const ok = await bcrypt.compare(dto.password, user.password);
    if (!ok) throw new UnauthorizedException('Неверный логин или пароль');

    const roles = (user.roles ?? []).map((r) => r.name);

    if (!user.id) throw new UnauthorizedException('Некорректный пользователь');

    const tokens = await this.signTokens(user.id, user.email, roles);
    await this.setRefreshHash(user.id, tokens.refresh);

    return {
      user: user.toJSON(),
      ...tokens,
    };
  }

  async refresh(userId: number, refreshToken: string) {
    const user = await this.users.findByPk(userId, {
      include: [RoleModel],
    });

    if (!user || !user.refresh_token_hash) {
      throw new UnauthorizedException('Неверная сессия');
    }

    const valid = await bcrypt.compare(refreshToken, user.refresh_token_hash);
    if (!valid) {
      throw new UnauthorizedException('Неверная сессия');
    }

    const roles = (user.roles ?? []).map((r) => r.name);

    if (!user.id) throw new UnauthorizedException('Некорректный пользователь');

    const tokens = await this.signTokens(user.id, user.email, roles);
    await this.setRefreshHash(user.id, tokens.refresh);

    return {
      user: user.toJSON(),
      ...tokens,
    };
  }

  async logout(userId: number) {
    await this.users.update(
      { refresh_token_hash: null },
      { where: { id: userId } },
    );
    return { success: true };
  }

  private async signTokens(userId: number, email: string, roles: string[]) {
    const payload = { sub: userId, email, roles };

    const access = await this.jwt.signAsync(payload, {
      secret: this.cfg.get<string>('JWT_ACCESS_SECRET'),
      expiresIn: this.cfg.get<string>('JWT_ACCESS_EXPIRES', '15m'),
    });

    const refresh = await this.jwt.signAsync(payload, {
      secret: this.cfg.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: this.cfg.get<string>('JWT_REFRESH_EXPIRES', '30d'),
    });

    return {
      access,
      refresh,
    };
  }

  private async setRefreshHash(userId: number, refreshToken: string) {
    const hash = await bcrypt.hash(refreshToken, 10);
    await this.users.update(
      { refresh_token_hash: hash },
      { where: { id: userId } },
    );
  }
}
