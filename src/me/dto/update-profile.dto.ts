import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateProfileDto {
  @ApiProperty({
    example: 'Rufina',
    description: 'Отображаемое имя пользователя',
  })
  @IsString({ message: 'Имя должно быть строкой' })
  @MaxLength(20, { message: 'Имя должно быть меньше 20 символов' })
  name: string;

  @ApiProperty({ example: 'Garaeva', description: 'Фамилия пользователя' })
  @IsOptional()
  @IsString({ message: 'Фамилия должна быть строкой' })
  @MaxLength(30, { message: 'Фамилия должна быть меньше 30 символов' })
  surname?: string;

  @ApiProperty({ example: 'rufina7306', description: 'Уникальный никнейм' })
  @IsString({ message: 'Никнейм должен быть строкой' })
  @MinLength(8, { message: 'Никнейм должен содержать не меньше 8 символов' })
  @MaxLength(10, { message: 'Никнейм должен содержать не больше 10 символов' })
  username: string;

  @ApiProperty({
    example: '+998901234567',
    description: 'Номер телефона (Узбекистан)',
  })
  @Matches(/^\+998\d{9}$/, {
    message: 'Номер телефона должен быть в формате +998XXXXXXXXX',
  })
  phone_number: string;

  @ApiProperty({
    example: 'rufina@gmail.com',
    description: 'Электронная почта',
  })
  @IsEmail({}, { message: 'Некорректный адрес электронной почты' })
  email: string;

  @ApiProperty({ example: 'qwerty123', description: 'Пароль пользователя' })
  @IsString({ message: 'Пароль должен быть строкой' })
  @MinLength(6, { message: 'Пароль должен содержать не меньше 6 символов' })
  @MaxLength(15, { message: 'Пароль должен содержать не больше 15 символов' })
  password: string;

  @ApiProperty({ example: 'Tashkent', description: 'Город проживания' })
  @IsOptional()
  @IsString({ message: 'Город должен быть строкой' })
  @MaxLength(15, { message: 'Город должен содержать не больше 15 символов' })
  city?: string;
}

