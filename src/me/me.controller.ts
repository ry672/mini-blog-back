import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import * as fs from 'fs/promises';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { UploadedFile } from '@nestjs/common';

import type {ReqUser} from "../common/guards/roles.guard"
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

import { MeService } from './me.service';

import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { UpdateProfileDto } from './dto/update-profile.dto';

@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('me')
export class MeController {
  constructor(private readonly meService: MeService) {}

  @Get()
  get(@CurrentUser() user: ReqUser) {
    return this.meService.get(user.id);
  }

  @Post('avatar')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['file'],
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: async (req, file, cb) => {
          try {
            const dir = join(process.cwd(), 'uploads', 'avatars');
            await fs.mkdir(dir, { recursive: true });
            cb(null, dir);
          } catch (e) {
            cb(e as Error, '');
          }
        },
        filename: (req, file, cb) => {
          const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          cb(null, `${unique}${extname(file.originalname).toLowerCase()}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        const ok = /image\/(png|jpeg|jpg|webp|gif)/i.test(file.mimetype);
        cb(ok ? null : new Error('Only image files are allowed'), ok);
      },
      limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
    })
  )
  async uploadAvatar(
    @CurrentUser() user: ReqUser,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException(
        'Необходимо прикрепить файл формата: png | jpg | jpeg | webp | gif',
      );
    }

    return this.meService.setAvatar(user.id, file);
  }

  @Post('logout')
  logout(@CurrentUser() user: ReqUser) {
    return this.meService.logout(user.id);
  }

  @Put()
  update(
    @CurrentUser() user: ReqUser,
    @Body() dto: UpdateProfileDto,
  ) {
    return this.meService.update(user.id, dto);
  }
}


