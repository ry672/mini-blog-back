import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Req } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({ summary: 'Создать комментарий к посту' })
  @ApiResponse({ status: 201, description: 'Комментарий успешно создан' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Post(':postId')
  create(@Param('postId') postId: string, @Req() req, @Body() dto: CreateCommentDto) {
    
    return this.commentsService.create(req.user.userId, +postId, dto);
  }

  @ApiOperation({ summary: 'Получить все комментарии user' })
  @ApiResponse({ status: 200, description: 'Список комментариев получен' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Get('user/:userId') 
  findAllByUser(@Param('userId') userId: string) {
    return this.commentsService.findAllByUser(+userId)
  }

  @ApiOperation({ summary: 'Получить все комментарии к посту' })
  @ApiResponse({ status: 200, description: 'Список комментариев получен' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Get('post/:postId')
  findAllByPost(@Param('postId') postId: string) {
    return this.commentsService.findAllByPost(+postId);
  }

  @ApiOperation({ summary: 'Получить комментарий по ID' })
  @ApiResponse({ status: 200, description: 'Комментарий найден' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findByPk(@Param('id') id: string) {
    return this.commentsService.findByPk(+id);
  }

  @ApiOperation({ summary: 'Обновить комментарий' })
  @ApiResponse({ status: 200, description: 'Комментарий успешно обновлён' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Req() req, @Body() dto: UpdateCommentDto) {
    return this.commentsService.update(+id, req.user.userId, dto);
  }

  @ApiOperation({ summary: 'Удалить комментарий' })
  @ApiResponse({ status: 200, description: 'Комментарий успешно удалён' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    return this.commentsService.remove(+id, req.user.userId);
  }
}






