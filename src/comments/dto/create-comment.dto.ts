import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateCommentDto {
    @ApiProperty({ example: "Отличный пост!", description: "Текст комментария" })
    @IsString({ message: "Content must be a string" })
    content: string;
}

