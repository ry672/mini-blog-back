import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { PostModel } from "./models/post.model";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";

@Injectable()
export class PostsService {
    constructor(
        @InjectModel(PostModel)
        private readonly postModel: typeof PostModel
    ) {}

    async create(userId: number, dto: CreatePostDto) {
        return await this.postModel.create({ ...dto, userId });
    }

    async findAll() {
        return await this.postModel.findAll();
    }
    async findByUserId(userId: number) {
        const posts = await this.postModel.findAll({
            where: { userId }
        });

        if (!posts || posts.length === 0) {
            throw new NotFoundException("У этого пользователя пока нет постов");
        }

        return posts;
    }

    async findByPk(id: number) {
        const post = await this.postModel.findByPk(id);
        if (!post) throw new NotFoundException("Пост не найден");
        return post;
    }

    async update(id: number, dto: UpdatePostDto) {
        const post = await this.findByPk(id);
        return await post.update(dto);
    }

    async remove(id: number) {
        const post = await this.findByPk(id);
        await post.destroy();
        return { message: "Пост успешно удалён" };
    }

    async like(id: number) {
        await this.findByPk(id);
        await this.postModel.increment('likes', { by: 1, where: { id } });
        const post = await this.postModel.findByPk(id);
        return post;
    }
    async unlike(id: number) {
        const post = await this.findByPk(id);
        const newLikes = post.likes > 0 ? post.likes - 1 : 0;
        await this.postModel.update({ likes: newLikes }, { where: { id } });
        return await this.postModel.findByPk(id);
    }

}







