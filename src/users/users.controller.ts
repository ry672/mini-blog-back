import { Controller, Get, Post, Body, Param, Delete, Query, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags("Users")
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({summary: "Создать пользователя"})
  @ApiResponse({status: 201, description: "Ползователь успешно создан"})
  @ApiBearerAuth("access-token")
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({summary: "Получение всех пользователей"})
  @ApiResponse({status: 201, description: "Список всех пользователей получен"})
  @ApiBearerAuth("access-token")
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({summary: "Получение пользователя по id"})
  @ApiResponse({status: 201, description: "Ползователь успешно создан"})
  @ApiBearerAuth("access-token")
  @UseGuards(JwtAuthGuard)
  @Get('/id/:id')
  findByPk(@Param('id') id: string) {
    return this.usersService.findByPk(+id);
  }

  @ApiOperation({summary: "Получение пользователя по username"})
  @ApiResponse({status: 201, description: "Ползователь успешно создан"})
  @ApiBearerAuth("access-token")
  @UseGuards(JwtAuthGuard)
  @Get('/username')
  findByUsername(@Query('username') username: string) {
    return this.usersService.findByUsername(username);
  }

  @ApiOperation({summary: "Получение пользователя по email"})
  @ApiResponse({status: 201, description: "Получение пользователя по email"})
  @ApiBearerAuth("access-token")
  @UseGuards(JwtAuthGuard)
  @Get('/email')
  findByEmail(@Query('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  @ApiOperation({summary: "Изменение данных пользователя"})
  @ApiResponse({status: 201, description: "Данные пользователя изменены"})
  @ApiBearerAuth("access-token")
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiOperation({summary: "Удаление пользователя"})
  @ApiResponse({status: 201, description: "Ползователь успешно удален"})
  @ApiBearerAuth("access-token")
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
