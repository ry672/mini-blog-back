import { Controller, Get, Post, Body, Param, Delete, Query, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("Users")
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({summary: "Создать пользователя"})
  @ApiResponse({status: 201, description: "Ползователь успешно создан"})
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({summary: "Получение всех пользователей"})
  @ApiResponse({status: 201, description: "Список всех пользователей получен"})
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({summary: "Получение пользователя по id"})
  @ApiResponse({status: 201, description: "Ползователь успешно создан"})
  @Get(':id')
  findByPk(@Param('id') id: string) {
    return this.usersService.findByPk(+id);
  }

  @ApiOperation({summary: "Получение пользователя по username"})
  @ApiResponse({status: 201, description: "Ползователь успешно создан"})
  @Get('/username')
  findByUsername(@Query('username') username: string) {
    return this.usersService.findByUsername(username);
  }

  @ApiOperation({summary: "Получение пользователя по email"})
  @ApiResponse({status: 201, description: "Получение пользователя по email"})
  @Get('/email')
  findByEmail(@Query('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  @ApiOperation({summary: "Изменение данных пользователя"})
  @ApiResponse({status: 201, description: "Данные пользователя изменены"})
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiOperation({summary: "Удаление пользователя"})
  @ApiResponse({status: 201, description: "Ползователь успешно удален"})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
