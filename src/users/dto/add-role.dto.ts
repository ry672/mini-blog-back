import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsPositive } from "class-validator";



export class AddRoleDto {
    @ApiProperty({example: 1})
    @IsInt()
    @IsPositive()
    roleId!: number;

}