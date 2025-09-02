import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    ForeignKey,
    BelongsTo,
} from "sequelize-typescript";
import { UserModel } from "../../users/models/user.model";

interface PostCreationAttrs {
    title: string;
    content: string;
    image?: string[];
    userId: number;
}

@Table({
    tableName: "posts",
    timestamps: true,
})
export class PostModel extends Model<PostModel, PostCreationAttrs> {
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.INTEGER })
    declare id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    title: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    content: string;

    @Column({
        type: DataType.ARRAY(DataType.STRING),
        allowNull: true,
        defaultValue: null,
    })
    image: string;

    @ForeignKey(() => UserModel)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userId: number;

    @BelongsTo(() => UserModel)
    author: UserModel;
}
