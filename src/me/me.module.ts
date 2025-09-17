import { Module } from '@nestjs/common';
import { MeService } from './me.service';
import { MeController } from './me.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from '../users/models/user.model';
import { PostModel } from 'src/posts/models/post.model';
import { CommentModel } from 'src/comments/models/coment.model';  // Импорт модели комментариев
import { AuthModule } from 'src/auth/auth.module'; 

@Module({
  imports: [
    SequelizeModule.forFeature([UserModel, PostModel, CommentModel]), // Добавил PostModel и CommentModel
    AuthModule, 
  ],
  controllers: [MeController],
  providers: [MeService],
})
export class MeModule {}


