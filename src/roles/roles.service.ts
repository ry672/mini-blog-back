import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { RoleModel } from './models/role.model';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(RoleModel) private readonly roleModel: typeof RoleModel
  ){}
  async create(dto: CreateRoleDto) {
    return this.roleModel.create(dto);
  }

  async findAll() {
    return this.roleModel.findAll();
  }

  async findByPk(id: number) {
    return this.roleModel.findByPk(id);
  }

  async findByName(name: string) {
    return this.roleModel.findOne({ where: { name } });
  }

  async update(id: number, dto: UpdateRoleDto) {
    const role = await this.roleModel.findByPk(id);
    if (!role) return null;

    await role.update(dto);
    return role;
  }

  async remove(id: number) {
    return await this.roleModel.destroy({ where: { id } });
  }
}
