import { ApiProperty } from "@nestjs/swagger";
import {
    IsString,
    IsOptional,
    MaxLength,
    IsArray,
    ArrayNotEmpty,
    IsInt,
} from "class-validator";

export class CreatePostDto {
    @ApiProperty({
        example: "Мой первый пост",
        description: "Заголовок поста",
    })
    @IsString({ message: "Title must be a string" })
    @MaxLength(150, { message: "Title must be less than 150 characters" })
    title: string;

    @ApiProperty({
        example: "Сегодня я делюсь своим опытом работы с NestJS и Sequelize...",
        description: "Содержимое поста",
    })
    @IsString({ message: "Content must be a string" })
    @MaxLength(2000, { message: "Content must be less than 2000 characters" })
    content: string;

    @ApiProperty({
        example: [
            "https://example.com/image1.jpg",
            "https://example.com/image2.jpg",
        ],
        description: "Массив ссылок на изображения поста",
        required: false,
        type: [String],
    })
    @IsOptional()
    @IsArray({ message: "Images must be an array" })
    @ArrayNotEmpty({ message: "Images array cannot be empty" })
    image?: string[];

    @ApiProperty({
        example: 1,
        description: "ID пользователя, который создал пост",
    })
    @IsInt({ message: "User ID must be an integer" })
    userId: number;
}

