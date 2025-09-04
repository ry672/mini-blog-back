import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UpdateCommentDto {
    @ApiProperty({ example: "Изменённый комментарий", description: "Новый текст комментария" })
    @IsString()
    content: string;
}

