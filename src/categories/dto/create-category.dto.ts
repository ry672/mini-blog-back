import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Музыка', description: 'Название категории' })
  @IsString()
  @MaxLength(50)
  name: string;

  @ApiProperty({ example: 'Посты о музыке', description: 'Описание категории', required: false })
  @IsOptional()
  @IsString()
  description?: string;
}

