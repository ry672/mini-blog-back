import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Matches, MaxLength } from "class-validator";

export class CreateRoleDto {
  @ApiProperty({ example: "admin" })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9_\-]{1,}$/, {
    message: "name: только латиница, цифры, '-', '_'",
  })
  @MaxLength(32)
  name: string;

  @ApiProperty({ example: "Администратор" })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  description: string;
}

