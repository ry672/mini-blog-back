import { InferAttributes, InferCreationAttributes } from "sequelize";
import { Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { UserModel } from "../models/user.model";
import { RoleModel } from "src/roles/models/role.model";

@Table({ tableName: "user_roles", timestamps: false })
export class UserRoleModel extends Model<
  InferAttributes<UserRoleModel>,
  InferCreationAttributes<UserRoleModel>
> {
  @ForeignKey(() => UserModel)
  @PrimaryKey
  @Column({ type: DataType.INTEGER })
  declare user_id: number;

  @ForeignKey(() => RoleModel)
  @PrimaryKey
  @Column({ type: DataType.INTEGER })
  declare role_id: number;
}