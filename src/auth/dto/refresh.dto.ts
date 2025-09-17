

import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsJWT } from 'class-validator';

export class RefreshDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsJWT()
  refresh_token!: string;
}
