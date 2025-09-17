import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { basename, join } from 'path';
import { promises as fs } from 'fs';
import { UserModel } from '../users/models/user.model';
import { AuthService } from 'src/auth/auth.service';
import { CommentModel } from 'src/comments/models/coment.model';
import { PostModel } from 'src/posts/models/post.model';

@Injectable()
export class MeService {
  constructor(
    @InjectModel(UserModel) private readonly users: typeof UserModel,
    private readonly auth: AuthService,
  ) {}

  async get(userId: number) {
    const user = await this.users.findByPk(userId, {include: [{ model: PostModel},{ model: CommentModel}]},);
    if (!user) throw new NotFoundException('Пользователь не найден');
    return user.toJSON();
  }

  async update(userId: number, dto: UpdateProfileDto) {
    if (dto.email) {
      const exists = await this.users.findOne({ where: { email: dto.email } });
      if (exists && exists.id !== userId) {
        throw new ForbiddenException('Электронная почта уже зарегистрирована');
      }
    }

    if (dto.phone_number) {
      const exists = await this.users.findOne({ where: { phone_number: dto.phone_number } });
      if (exists && exists.id !== userId) {
        throw new ForbiddenException('Номер телефона уже используется');
      }
    }

    const user = await this.users.findByPk(userId);
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    await user.update(dto);
    return user.toJSON();
  }

  async setAvatar(userId: number, file: Express.Multer.File) {
    const user = await this.users.findByPk(userId);
    if (!user) throw new NotFoundException('Пользователь не найден');

    const relativePath = `avatars/${file.filename}`;
    const publicUrl = `/static/${relativePath}`;

    if (user.profile_photo) {
      try {
        const prevName = basename(user.profile_photo);
        const prevPath = join(process.cwd(), 'uploads', 'avatars', prevName);
        await fs.unlink(prevPath);
      } catch (err) {
        // Optional: log the error
      }
    }

    await user.update({ profile_photo: publicUrl });
    return user.toJSON();
  }

  async logout(userId: number) {
    return this.auth.logout(userId);
  }
}


