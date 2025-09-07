import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoryModel } from './models/category.model';
import { PostModel } from 'src/posts/models/post.model';

@Module({
  imports: [SequelizeModule.forFeature([CategoryModel, PostModel])],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [CategoriesService]
})
export class CategoriesModule {}
