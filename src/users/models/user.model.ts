import {
    Table,
    Column,
    Model,
    DataType
} from "sequelize-typescript";

interface UserModelCreation {
    name: string;
    surname?: string;
    username: string;
    phone_number: string;
    email: string;
    password: string;
    city?: string;
    profile_photo?: string;
    
}

@Table({
    tableName: "users",
    timestamps: true,
})
export class UserModel extends Model<UserModel, UserModelCreation> {
    @Column({ type: DataType.STRING, allowNull: false })
    declare name: string;

    @Column({ type: DataType.STRING, allowNull: true , defaultValue: null})
    declare surname: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true, 
    })
    declare username: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true, 
    })
    declare phone_number: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true, 
    })
    declare email: string;

    @Column({ type: DataType.STRING, allowNull: false })
    declare password: string;

    


    @Column({ type: DataType.STRING, allowNull: true,defaultValue: null })
    declare city: string;


    @Column({ type: DataType.STRING, allowNull: true })
    declare profile_photo: string;



 
}
