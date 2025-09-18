import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { PostModel } from '..//models/post.model'
import { UserModel } from '../../users/models/user.model'; // путь может отличаться

@Table({ tableName: 'likes', timestamps: true })
export class LikeModel extends Model<LikeModel> {
  @ForeignKey(() => UserModel)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare userId: number;

  @ForeignKey(() => PostModel)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare postId: number;
}
