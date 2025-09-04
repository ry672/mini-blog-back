import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { UserModel } from '../../users/models/user.model';


interface PostCreationAttrs {
  title: string;
  content: string;
  images?: string[];
  userId: number;
  
}

@Table({ tableName: 'posts', timestamps: true })
export class PostModel extends Model<PostModel, PostCreationAttrs> {
  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  content: string;

  @Column({ type: DataType.JSON, allowNull: true })
  images: string[];

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  likes: number;

  @ForeignKey(() => UserModel)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  @BelongsTo(() => UserModel)
  author: UserModel;

  
}
