
import { Column, DataType, Model, Table } from "sequelize-typescript";

type CategoryModelCreation = {
    name: string
}

@Table({tableName: 'category'})
export class CategoryModel extends Model<CategoryModel>{
    @Column({type: DataType.INTEGER, autoIncrement: true, primaryKey: true})
    declare id: number;

    @Column({type: DataType.STRING, allowNull: false})
    name: string


}
