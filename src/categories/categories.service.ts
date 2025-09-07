import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CategoryModel } from './models/category.model';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreationAttributes } from 'sequelize';
import { PostModel } from '../posts/models/post.model';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(CategoryModel)
    private readonly categoryModel: typeof CategoryModel,

    @InjectModel(PostModel)
    private readonly postModel: typeof PostModel,
  ) {}

  async create(dto: CreateCategoryDto) {
    return await this.categoryModel.create(
      dto as CreationAttributes<CategoryModel>,
    );
  }

  async findAll() {
    return await this.categoryModel.findAll();
  }

  async findByPk(id: number) {
    const category = await this.categoryModel.findByPk(id, {
      include: { all: true },
    });
    if (!category) throw new NotFoundException('Категория не найдена');
    return category;
  }

  async findByName(name: string) {
    const category = await this.categoryModel.findOne({
      where: { name },
      include: [this.postModel],
    });

    if (!category) {
      throw new NotFoundException(`Категория с именем "${name}" не найдена`);
    }

    return category;
  }

  async update(id: number, dto: UpdateCategoryDto) {
    const category = await this.findByPk(id);
    return await category.update(dto);
  }

  async remove(id: number) {
    await this.postModel.destroy({ where: { categoryId: id } });

    const deleted = await this.categoryModel.destroy({ where: { id } });

    if (!deleted) {
      throw new NotFoundException('Категория не найдена');
    }

    return { message: 'Категория и связанные посты удалены' };
  }
}
