import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { UserModel } from '../../users/models/user.model';
import { CategoryModel } from '../../categories/models/category.model';
import { CreationOptional } from 'sequelize';



interface PostCreationAttrs {
  title: string;
  content: string;
  images?: string[];
  userId: number;
  categoryId?: number | null;
}

@Table({ tableName: 'posts', timestamps: true })
export class PostModel extends Model<PostModel, PostCreationAttrs > {
  @Column({ type: DataType.STRING, allowNull: false })
  declare title: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  declare content: string;

  @Column({ type: DataType.JSON, allowNull: true })
  declare images: string[];

  @ForeignKey(() => UserModel)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare userId: number;

  @BelongsTo(() => UserModel)
  declare author: UserModel;

  @ForeignKey(() => CategoryModel)
  @Column({ type: DataType.INTEGER, allowNull: true })
  declare categoryId?: number | null;

  @BelongsTo(() => CategoryModel)
  declare category: CategoryModel;

  @Column({ type: DataType.ARRAY(DataType.INTEGER), defaultValue: [] })
  declare likedUserIds: number[];

  
}

