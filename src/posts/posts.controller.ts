import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import type { Request } from 'express';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({ summary: 'Создать посты' })
  @ApiResponse({ status: 200, description: 'Пост успешно создан' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Post(':userId')
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: diskStorage({
        destination: './uploads/posts',
        filename: (req, file, cb) => {
          const originalName = file.originalname;
          const ext = originalName.includes('.') ? '' : '.jpg';
          const safeName = originalName + ext;
          cb(null, safeName);
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', example: 'Мой первый пост!' },
        content: { type: 'string', example: 'Сегодня......' },
        images: {
          type: 'array',
          items: { type: 'string', format: 'binary' },
        },
        categoryId: { type: 'number' },
      },
    },
  })
  create(
    @Param('userId') userId: string,
    @Body() createPostDto: CreatePostDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    if (files && files.length > 0) {
      createPostDto.images = files.map(
        (file) => `/uploads/posts/${file.filename}`,
      );
    }
    return this.postsService.create(+userId, createPostDto);
  }

  @ApiOperation({ summary: 'Получить все посты' })
  @ApiResponse({ status: 200, description: 'Список всех постов' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() req: Request) {
    const currentUserId = (req as any).user.id;
    return this.postsService.findAllWithLikeInfo(currentUserId);
  }

  @ApiOperation({ summary: 'Получить все посты конкретного пользователя' })
  @ApiResponse({ status: 200, description: 'Список постов пользователя' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Get('user/:userId')
  findByUserId(
    @Param('userId', ParseIntPipe) userId: number,
    @Req() req: Request,
  ) {
    const currentUserId = (req as any).user.id;
    return this.postsService.findByUserIdWithLikeInfo(userId, currentUserId);
  }

  @ApiOperation({ summary: 'Получить пост по ID' })
  @ApiResponse({ status: 200, description: 'Пост найден' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findByPk(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request,
  ) {
    const currentUserId = (req as any).user.id;
    return this.postsService.findByPkWithLikeInfo(id, currentUserId);
  }

  @ApiOperation({ summary: 'Обновить пост' })
  @ApiResponse({ status: 200, description: 'Пост успешно обновлён' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.update(id, updatePostDto);
  }

  @ApiOperation({ summary: 'Удалить пост' })
  @ApiResponse({ status: 200, description: 'Пост успешно удалён' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.remove(id);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Post(':id/like')
  async toggleLike(
    @Param('id', ParseIntPipe) postId: number,
    @Req() req: Request,
  ) {
    const userId = (req as any).user.id;
    return this.postsService.toggleLikeAndReturn(userId, postId);
  }
}

