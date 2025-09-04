import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength, IsOptional, MinLength, Matches, IsEmail } from "class-validator";

export class RegisterDto {
    @ApiProperty({example: "Rufina", description: "Отоброжаемое имя пользоавателя"})
    @IsString({ message: "Name must be a string" })
    @MaxLength(50, { message: "Name must be less than 50 characters" })
    name: string;

    @ApiProperty({ example: "Garaeva", description: "Фамилия пользователя" })
    @IsOptional()
    @IsString({ message: "Surname must be a string" })
    @MaxLength(50, { message: "Surname must be less than 50 characters" })
    surname?: string;

    @ApiProperty({ example: "rufina7306", description: "Уникальный никнейм" })
    @IsString({ message: "Username must be a string" })
    @MinLength(3, { message: "Username must be at least 3 characters" })
    @MaxLength(32, { message: "Username must be less than 32 characters" })
    username: string;

    @ApiProperty({ example: "+998903725937", description: "Номер телефона" })

    @Matches(/^\+?[0-9]{9,15}$/, {
        message: "Phone number must contain only numbers and be 9-15 digits",
    })
    phone_number: string;

    @ApiProperty({ example: "rufina@gmail.com", description: "Электронная почта" })
    @IsEmail({}, { message: "Invalid email address" })
    email: string;

    @ApiProperty({ example: "qwerty123", description: "Пароль пользователя" })
    @IsString({ message: "Password must be a string" })
    @MinLength(6, { message: "Password must be at least 6 characters" })
    @MaxLength(100, { message: "Password must be less than 100 characters" })
    password: string;

 

    @ApiProperty({ example: "Tashkent", description: "Город проживания" })
    @IsOptional()
    @IsString({ message: "City must be a string" })
    @MaxLength(100, { message: "City name must be less than 100 characters" })
    city?: string;
    


}
