import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryModel } from './models/category.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(CategoryModel) private categoryModel: typeof CategoryModel
  ){}
  async create(dto: CreateCategoryDto) {
    return await this.categoryModel.create(dto)
  }

  async findAll() {
    return await this.categoryModel.findAll();
  }

  async findByPk(id: number) {
    return await this.categoryModel.findByPk(id)
  }

  async findByPostId(id: number) {
    return await this.categoryModel.findByPostId(id, postId);
  }

  update(id: number, dto: UpdateCategoryDto) {
    const category = await this.categoryModel.findByPk(id)
    if(!category) throw new NotFoundException("Категория не найдена")

    const updateCategory = await category.update(dto)

    return updateCategory
  }

  remove(id: number) {
    
  }
}
