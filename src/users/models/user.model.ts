import {
  Table,
  Column,
  Model,
  DataType,
  BeforeSave,
  AllowNull,
  BelongsToMany,
  HasMany,
} from 'sequelize-typescript';
import * as sequelize from 'sequelize';
import * as bcrypt from 'bcrypt';
import { RoleModel } from '../../roles/models/role.model';
import { UserRoleModel } from './user-roles.model'; 
import { type CreationOptional } from 'sequelize';
import { PostModel } from 'src/posts/models/post.model';
import { CommentModel } from 'src/comments/models/coment.model';

export interface UserAttributes {
  id: number;
  name: string;
  surname: string;
  username: string;
  phone_number: string;
  email: string;
  password?: string;
  city: string;
  refresh_token_hash?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

@Table({
  tableName: 'users',
  timestamps: true,
})
export class UserModel extends Model<
  sequelize.InferAttributes<UserModel>,
  sequelize.InferCreationAttributes<UserModel>
> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id?: CreationOptional<number>;

  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @Column({ type: DataType.STRING, allowNull: true, defaultValue: null })
  declare surname: CreationOptional<string>;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  declare username: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  declare phone_number: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  declare email: string;

  @Column({ type: DataType.STRING, allowNull: true})
  declare password?: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  declare refresh_token_hash: string | null;

  @Column({ type: DataType.STRING, allowNull: true, defaultValue: null })
  declare city?: CreationOptional<string>;

  @Column({ type: DataType.STRING, allowNull: true, defaultValue: null })
  declare profile_photo?: CreationOptional<string>;

  @BelongsToMany(() => RoleModel, () => UserRoleModel)
  declare roles?: RoleModel[];

  @HasMany(() => PostModel)
  declare posts?: PostModel[];

  @HasMany(() => CommentModel)
  declare comments?: CommentModel[];

  
  @BeforeSave
  static async hashPassword(instance: UserModel): Promise<void> {
    const pwd = instance.getDataValue('password');
    if (typeof pwd !== 'string' || pwd.length === 0) return;

    const shouldHash = instance.isNewRecord || instance.changed('password');
    if (!shouldHash) return;

    const alreadyHashed = /^\$2[aby]\$\d{2}\$/.test(pwd);
    if (alreadyHashed) return;

    const salt = await bcrypt.genSalt(10);
    instance.setDataValue('password', await bcrypt.hash(pwd, salt));
  }

  
  toJSON(): Omit<UserAttributes, 'password'> {
    const plain = this.get({ plain: true }) as UserAttributes;
    delete plain.password;
    return plain;
  }
}


