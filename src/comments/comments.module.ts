import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { CommentModel } from "../comments/models/coment.model";
import { CommentsService } from "./comments.service";
import { CommentsController } from "./comments.controller";
import { PostModel } from "../posts/models/post.model";
import { UserModel } from "../users/models/user.model";

@Module({
    imports: [SequelizeModule.forFeature([CommentModel, PostModel, UserModel])],
    controllers: [CommentsController],
    providers: [CommentsService],
    exports: [CommentsService],
})
export class CommentsModule {}

