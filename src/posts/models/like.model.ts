import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { UserModel } from '../../users/models/user.model';
import { PostModel } from './post.model';

interface LikeCreationAttrs {
  userId: number;
  postId: number;
  isActive: boolean;
}

@Table({ tableName: 'likes', timestamps: true })
export class LikeModel extends Model<LikeModel, LikeCreationAttrs> {
  @ForeignKey(() => UserModel)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare userId: number;

  @BelongsTo(() => UserModel)
  declare user: UserModel;

  @ForeignKey(() => PostModel)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare postId: number;

  @BelongsTo(() => PostModel)
  declare post: PostModel;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  declare isActive: boolean;
}


