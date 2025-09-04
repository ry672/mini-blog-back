import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { CommentsModule } from './comments/comments.module';
import { CategoriesModule } from './categories/categories.module';



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
    }),AuthModule, UsersModule, PostsModule, CommentsModule, CategoriesModule
  ],

})
export class AppModule {}
