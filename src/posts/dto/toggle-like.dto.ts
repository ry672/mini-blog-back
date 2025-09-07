import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from "class-validator";

export class ToggleLikeDto {
  @ApiProperty({ example: 1, description: "ID поста" })
  @IsInt()
  postId: number;
}
