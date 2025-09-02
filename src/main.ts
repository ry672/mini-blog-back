import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({whitelist: true, forbidNonWhitelisted: true, transform: true}))
  app.setGlobalPrefix("/api")

  const config = new DocumentBuilder()
  .setTitle("Mini blog Api")
  .setDescription("REST API для мини блога")
  .setVersion('1.0.0')
  .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
