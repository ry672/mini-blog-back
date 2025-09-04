import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { UserModel } from '../../users/models/user.model';
import { PostModel } from '../../posts/models/post.model';

interface CommentCreationAttrs {
  content: string;
  userId: number;
  postId: number;
}

@Table({ tableName: 'comments', timestamps: true })
export class CommentModel extends Model<CommentModel, CommentCreationAttrs> {
  @Column({ type: DataType.TEXT, allowNull: false })
  content!: string;

  @ForeignKey(() => UserModel)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId!: number;

  @BelongsTo(() => UserModel)
  author!: UserModel;

  @ForeignKey(() => PostModel)
  @Column({ type: DataType.INTEGER, allowNull: false })
  postId!: number;

  @BelongsTo(() => PostModel)
  post!: PostModel;
}



