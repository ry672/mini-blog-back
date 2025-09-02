import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
} from "sequelize-typescript";

interface UserModelCreation {
    name: string;
    surname?: string;
    username: string;
    phone_number: string;
    email: string;
    password: string;
    city?: string;
}

@Table({
    tableName: "users",
    timestamps: true,
})
export class UserModel extends Model<UserModel, UserModelCreation> {
    @Column({ type: DataType.STRING, allowNull: false })
    name: string;

    @Column({ type: DataType.STRING, allowNull: true , defaultValue: null})
    surname: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true, 
    })
    username: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true, 
    })
    phone_number: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true, 
    })
    email: string;

    @Column({ type: DataType.STRING, allowNull: false })
    password: string;




    @Column({ type: DataType.STRING, allowNull: true,defaultValue: null })
    city: string;

 
}
