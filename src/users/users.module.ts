import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from './models/user.model';
import { UserRoleModel } from './models/user-roles.model';
import { RoleModel } from 'src/roles/models/role.model';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Module({
  imports: [SequelizeModule.forFeature([UserModel, UserRoleModel, RoleModel])],
  controllers: [UsersController],
  providers: [UsersService, RolesGuard],
  exports: [UsersService]
})
export class UsersModule {}
