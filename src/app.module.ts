import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { CommentsModule } from './comments/comments.module';
import { CategoriesModule } from './categories/categories.module';
import { RolesModule } from './roles/roles.module';
import { MeModule } from './me/me.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';



@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}), 
    SequelizeModule.forRoot({
     dialect: 'postgres',
     host: process.env.DB_HOST,
     port: parseInt(process.env.DB_PORT || '5432', 10),
     username: process.env.DB_USER,
     password: process.env.DB_PASSWORD,
     database: process.env.DB_NAME,
     autoLoadModels: true,
     synchronize: true,
     logging: process.env.MODE === 'development',
     sync: {force: process.env.MODE === 'development'}
    }),ServeStaticModule.forRoot({rootPath: join(process.cwd(), 'uploads'), serveRoot: '/static'}),AuthModule, UsersModule, PostsModule, CommentsModule, CategoriesModule, RolesModule, MeModule
  ],

})
export class AppModule {}
