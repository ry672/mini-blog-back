import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from './models/user.model';
import { RoleModel } from '../roles/models/role.model';
import { UserRoleModel } from 'src/users/models/user-roles.model';


@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserModel)
    private userModel: typeof UserModel,
    @InjectModel(RoleModel) private readonly rolesModel: typeof RoleModel,
    @InjectModel(UserRoleModel) private readonly userRoleModel: typeof UserRoleModel
  ){}
  async create(dto: CreateUserDto) {
    const existingUsername = await this.userModel.findOne({where: {username: dto.username}})
    const existingEmail = await this.userModel.findOne({where: {username: dto.email}})
    const existingPhone = await this.userModel.findOne({where: {username: dto.phone_number}})

    if(existingUsername || existingEmail || existingPhone) {
      throw new ConflictException("Пользователь уже существует")
    }
    return await this.userModel.create(dto);
  }
  async findByPk(id: number) {
    const user = await this.userModel.findByPk(id, {include: [{model: RoleModel}]})

    return user
  }

  async findAll() {
    return await this.userModel.findAll({include: [{model: RoleModel}]});
  }
  async findByUsername(username: string) {
    const user = await this.userModel.findOne({where: {username}, include: [{model: RoleModel}]})

    return user

  }
  async findByEmail(email: string ) {
    const user = await this.userModel.findOne({where: {email}, include: [{model: RoleModel}]})
    return user
  }

  async findByPhone(phone_number: string) {
    const user = await this.userModel.findOne({where: {phone_number}, include: [{model: RoleModel}]})
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
  


  async addRole(userId: number, roleId: number) {
    const user = await this.userModel.findByPk(userId);
    const role = await this.rolesModel.findByPk(roleId);

    if (!user) {
      throw new NotFoundException("Пользователь не найден");
    }

    if (!role) {
      throw new NotFoundException("Роль не найдена");
    }

    await user.$add("roles", roleId);
    return this.findByPk(userId);
  }

  async removeRole(userId: number, roleId: number) {
    await this.userRoleModel.destroy({
      where: { user_id: userId, role_id: roleId },
    });

    return this.findByPk(userId);
  }



}
