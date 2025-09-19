import { Injectable, NotFoundException, ForbiddenException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CommentModel } from "../comments/models/coment.model";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";

import { UserModel } from "src/users/models/user.model";

@Injectable()
export class CommentsService {
  constructor(@InjectModel(CommentModel) private commentModel: typeof CommentModel, @InjectModel(UserModel) private userModel: typeof UserModel) {}
  

  async create(userId: number, postId: number, dto: CreateCommentDto) {
    return await this.commentModel.create({ content: dto.content, userId, postId });
  }

  async findAllByUser(userId: number) {
    return await this.commentModel.findAll({where: {userId}, include: [{ model: this.userModel, as: 'author' }]} )
  }

  async findAllByPost(postId: number) {
    return await this.commentModel.findAll({ where: { postId }, include: [{ model: this.userModel, as: 'author' }]});
  }

  async findByPk(id: number) {
    const comment = await this.commentModel.findByPk(id, {include: [{ model: this.userModel, as: 'author' }]});
    if (!comment) throw new NotFoundException("Комментарий не найден");
    return comment;
  }

  async update(id: number, userId: number, dto: UpdateCommentDto) {
    const comment = await this.findByPk(id);
    
    return await comment.update({ content: dto.content });
  }

  async remove(id: number, userId: number) {
    const comment = await this.findByPk(id);
    
    await comment.destroy();
    return { message: "Комментарий удалён" };
  }
}



