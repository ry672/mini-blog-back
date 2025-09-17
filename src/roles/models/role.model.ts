import {
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import {
  AllowNull,
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
  Unique,
} from "sequelize-typescript";
import { UserModel } from "src/users/models/user.model";
import { UserRoleModel } from "src/users/models/user-roles.model";

@Table({ tableName: "roles", timestamps: true })
export class RoleModel extends Model<
  InferAttributes<RoleModel>,
  InferCreationAttributes<RoleModel>
> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id?: number;

  @Unique
  @AllowNull(false)
  @Column({ type: DataType.STRING })
  declare name: string;

  @AllowNull(false)
  @Column({ type: DataType.STRING })
  declare description: string;

  @BelongsToMany(() => UserModel, () => UserRoleModel)
  declare users?: UserModel[];
}


