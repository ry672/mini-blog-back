import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { PostModel } from '../../posts/models/post.model';

interface CategoryCreationAttrs {
  name: string;
  description?: string;
}

@Table({ tableName: 'categories', timestamps: true })
export class CategoryModel extends Model<CategoryModel, CategoryCreationAttrs> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare description: string;

  @HasMany(() => PostModel)
  declare posts: PostModel[];
}

