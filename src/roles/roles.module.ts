import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { RoleModel } from './models/role.model';
import { UserModel } from 'src/users/models/user.model';
import { UserRoleModel } from '../users/models/user-roles.model';

@Module({
  imports: [SequelizeModule.forFeature([RoleModel, UserModel, UserRoleModel])],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
