import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PostModel } from './models/post.model';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UserModel } from 'src/users/models/user.model';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(PostModel)
    private readonly postModel: typeof PostModel,

    @InjectModel(UserModel)
    private readonly userModel: typeof UserModel,
  ) {}

  async create(userId: number, dto: CreatePostDto) {
    return await this.postModel.create({ ...dto, userId });
  }

  // Новый метод: получить все посты с лайк-инфой по текущему пользователю
  async findAllWithLikeInfo(currentUserId: number): Promise<any> {
    const posts = await this.postModel.findAll();

    return posts.map((post) => ({
      ...post.get(),
      likesCount: post.likedUserIds.length,
      likedByUser: post.likedUserIds.includes(currentUserId),
    }));
  }

  // Новый метод: посты пользователя с лайк-инфой
  async findByUserIdWithLikeInfo(userId: number, currentUserId: number): Promise<any> {
    const posts = await this.postModel.findAll({
      where: { userId },
    });

    if (!posts || posts.length === 0) {
      throw new NotFoundException('У этого пользователя пока нет постов');
    }

    return posts.map((post) => ({
      ...post.get(),
      likesCount: post.likedUserIds.length,
      likedByUser: post.likedUserIds.includes(currentUserId),
    }));
  }

  // Новый метод: один пост с лайк-инфой
  async findByPkWithLikeInfo(id: number, currentUserId: number): Promise<any> {
    const post = await this.postModel.findByPk(id);
    if (!post) throw new NotFoundException('Пост не найден');

    return {
      ...post.get(),
      likesCount: post.likedUserIds.length,
      likedByUser: post.likedUserIds.includes(currentUserId),
    };
  }

  async update(id: number, dto: UpdatePostDto) {
    const post = await this.postModel.findByPk(id);
    if (!post) throw new NotFoundException('Пост не найден');
    return await post.update(dto);
  }

  async remove(id: number) {
    const post = await this.postModel.findByPk(id);
    if (!post) throw new NotFoundException('Пост не найден');
    await post.destroy();
    return { message: 'Пост успешно удалён' };
  }

  async toggleLikeAndReturn(userId: number, postId: number): Promise<any> {
    const post = await this.postModel.findByPk(postId);
    if (!post) throw new NotFoundException('Пост не найден');

    let liked = false;

    if (post.likedUserIds.includes(userId)) {
      post.likedUserIds = post.likedUserIds.filter((id) => id !== userId);
      liked = false;
    } else {
      post.likedUserIds = [...post.likedUserIds, userId];
      liked = true;
    }

    await post.save();

    const user = await this.userModel.findByPk(userId);

    return {
      liked,
      user,
      post: {
        ...post.get(),
        likesCount: post.likedUserIds.length,
        likedByUser: liked,
      },
    };
  }
}

