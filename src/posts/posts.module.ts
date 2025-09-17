
import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { PostModel } from "./models/post.model";

import { PostsService } from "./posts.service";
import { PostsController } from "./posts.controller";
import { UserModel } from "src/users/models/user.model";




@Module({
  imports: [SequelizeModule.forFeature([PostModel,  UserModel])],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService],
})
export class PostsModule {}



