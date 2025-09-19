import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString, IsOptional, MaxLength, IsArray, IsInt } from "class-validator";

export class CreatePostDto {
  @ApiProperty({ example: "Мой первый пост", description: "Заголовок поста" })
  @IsString()
  @MaxLength(50)
  title: string;

  @ApiProperty({ example: "Это мой первый пост!", description: "Содержимое поста" })
  @IsString()
  content: string;

  @ApiProperty({
    example: ["/uploads/img1.jpg", "/uploads/img2.jpg"],
    description: "URL изображений",
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @ApiProperty({
    example: 1,
    description: "ID категории",
    required: false,
    nullable: true,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  categoryId?: number | null = null;
}





