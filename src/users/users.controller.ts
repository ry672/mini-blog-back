import { Controller, Get, Post, Body, Param, Delete, Query, Put, UseGuards, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { AddRoleDto } from './dto/add-role.dto';


@ApiBearerAuth("access-token")
@UseGuards(JwtAuthGuard)
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
  @Get('/id/:id')
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

  @Post(':id/roles')
  addRole(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: AddRoleDto 
  ) {
    return this.usersService.addRole(id, dto.roleId);
  }

  @Delete(":id/roles/:roleId")
  removeRole(
    @Param("id", ParseIntPipe) id: number,
    @Param("roleId", ParseIntPipe) roleId: number
  ) {
    return this.usersService.removeRole(id, roleId);
  }

}
