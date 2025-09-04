import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from "path";
import { NestExpressApplication } from "@nestjs/platform-express";


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
  app.setGlobalPrefix("/api");

  app.useStaticAssets(join(__dirname, "..", "uploads"), {
    prefix: "/uploads",
  });



  const config = new DocumentBuilder()
    .setTitle("Mini blog Api")
    .setDescription("REST API для мини блога")
    .setVersion('1.0.0')
    .addBearerAuth({
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT"
    }, "access-token")
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  


  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();

