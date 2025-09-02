import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from './models/user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserModel)
    private userModel: typeof UserModel
  ){}
  create(createUserDto: CreateUserDto) {
    return this.userModel.create(createUserDto)
  }
  async findByPk(id: number) {
    return await this.userModel.findByPk(id)
  }

  async findAll() {
    return await this.userModel.findAll();
  }
  async findByUsername(username: string) {
    return await this.userModel.findOne({where: {username}})

  }
  async findByEmail(email: string ) {
    return await this.userModel.findOne({where: {email}})
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findByPk(id)

    if (!user) {
      throw new NotFoundException("Пользователь не найден")

    }

    return await user.update(updateUserDto)
  }

  async remove(id: number) {
    const user = await this.userModel.findByPk(id)
    if (!user) {
      throw new NotFoundException("Пользователь не найден")

    }
    await this.userModel.destroy()

    return ("Пользователь успешно удален")
  }
}
