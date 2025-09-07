import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
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
  async create(dto: CreateUserDto) {
    const existingUsername = await this.userModel.findOne({where: {username: dto.username}})
    const existingEmail = await this.userModel.findOne({where: {username: dto.email}})
    const existingPhone = await this.userModel.findOne({where: {username: dto.phone_number}})

    if(existingUsername || existingEmail || existingPhone) {
      throw new ConflictException("Пользователь уже существует")
    }
    return await this.userModel.create({
      name: dto.name,
      username: dto.username,
      surname: dto.surname,
      phone_number: dto.phone_number,
      email: dto.email,
      password: dto.password,
      city: dto.city,
      profile_photo: dto.profile_photo,
      

    });
  }
  async findByPk(id: number) {
    const user = await this.userModel.findByPk(id)

    return user
  }

  async findAll() {
    return await this.userModel.findAll();
  }
  async findByUsername(username: string) {
    const user = await this.userModel.findOne({where: {username}})

    return user

  }
  async findByEmail(email: string ) {
    const user = await this.userModel.findOne({where: {email}})
    return user
  }

  async findByPhone(phone_number: string) {
    const user = await this.userModel.findOne({where: {phone_number}})
    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findByPk(id)

    if (!user) {
      throw new NotFoundException("Пользователь не найден")

    }

    return await user.update(updateUserDto)
  }

  async remove(id: number) {
    const user = await this.userModel.findByPk(id);

    await this.userModel.destroy({
      where: { id }, 
    });

    return ("Пользователь успешно удален")
  }

}
