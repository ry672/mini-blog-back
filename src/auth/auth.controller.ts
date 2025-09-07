import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import {
  ApiTags,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiResponse({ status: 201, description: 'Пользователь успешно зарегистрирован' })
  @UseInterceptors(
    FileInterceptor('profile_photo', {
      storage: diskStorage({
        destination: './uploads/users',
        filename: (req, file, cb) => {
          const uniqueName = `${Date.now()}-${Math.round(
            Math.random() * 1e9,
          )}${path.extname(file.originalname)}`;
          cb(null, uniqueName);
        },
      }),
      fileFilter: (req, file, cb) => {
        // Разрешаем только изображения
        const allowedTypes = /jpeg|jpg|png|webp|gif/;
        const extname = allowedTypes.test(
          path.extname(file.originalname).toLowerCase(),
        );
        const mimetype = allowedTypes.test(file.mimetype);

        if (extname && mimetype) {
          cb(null, true);
        } else {
          cb(new BadRequestException('Можно загружать только изображения'), false);
        }
      },
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Rufina' },
        surname: { type: 'string', example: 'Garaeva' },
        username: { type: 'string', example: 'rufina7306' },
        phone_number: { type: 'string', example: '+998990172406' },
        email: { type: 'string', example: 'rufina@gmail.com' },
        password: { type: 'string', example: 'qwerty123' },
        city: { type: 'string', example: 'Tashkent' },
        profile_photo: {
          type: 'string',
          format: 'binary', // Swagger показывает binary, но фактически можно загружать любые картинки
        },
      },
    },
  })
  async register(
    @Body() body: RegisterDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('Фото профиля обязательно');
    }

    // Сохраняем путь к файлу в DTO
    body.profile_photo = `/uploads/users/${file.filename}`;
    return this.authService.register(body);
  }

  @Post('/login')
  @ApiOperation({ summary: 'Авторизация пользователя' })
  @ApiResponse({ status: 200, description: 'Пользователь успешно вошел' })
  login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }
}


