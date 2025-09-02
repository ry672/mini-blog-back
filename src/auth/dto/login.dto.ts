import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength, MaxLength } from "class-validator";


export class LoginDto {
    @ApiProperty({ example: "rufina@gmail.com", description: "Электронная почта" })
    @IsEmail({}, { message: "Invalid email address" })
    email: string;

    @ApiProperty({ example: "qwerty123", description: "Пароль пользователя" })
    @IsString({ message: "Password must be a string" })
    @MinLength(6, { message: "Password must be at least 6 characters" })
    @MaxLength(100, { message: "Password must be less than 100 characters" })
    password: string;
}

