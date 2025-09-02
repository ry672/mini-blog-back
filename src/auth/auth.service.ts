import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto} from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService

  ){}
  async register (dto: RegisterDto) {
    const existingEmail = await this.usersService.findByEmail(dto.email)
    const existingUsername = await this.usersService.findByUsername(dto.username)
    if(existingEmail) throw new ConflictException("Пользователь с таким адресом электроной почтой уже зарегистрирован")
    if(existingUsername) throw new ConflictException("Пользователь с таким username уже зарегистрирован")

    const hash = await bcrypt.hash(dto.password, 10);
    const user = await this.usersService.create({
      name: dto.name,
      username: dto.username,
      phone_number: dto.phone_number,
      email: dto.email,
      password: hash

    })
    const payload = {sub: user.id, email: user.email}
    const token = this.jwtService.sign(payload)

    return {
      message: "Пользователь успешно зарегистрирован",
      token
    }

  }
  async login (dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email)
    if(!user) throw new UnauthorizedException("Неверный логин или пароль")
    
    const isMatch = await bcrypt.compare(dto.password, user.password)
    if(!isMatch) throw new UnauthorizedException("Неверный логин или пароль")

    const payload = {sub: user.id, email: user.email}
    const token = this.jwtService.sign(payload)

    return {
      message: "Пользователь успешно вошел в аккаунт",
      token
    }
    
  }
}
