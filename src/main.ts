import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  });
  const port = process.env.PORT || 3000;

  app.setGlobalPrefix("ansur/api");

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );
// opciones para la documentacion swagger
  const config = new DocumentBuilder()
    .setTitle("Products example")
    .setDescription("Products API description")
    .setVersion("1.0")
    .build();
// crea el documento swagger
  const document = SwaggerModule.createDocument(app, config);
// guarda el documento como archivo JSON
  fs.writeFileSync('./swagger-spec.json', JSON.stringify(document));
// configura la ruta para acceder a la documentacion
  SwaggerModule.setup("docs", app, document);

  await app.listen(port);
}
bootstrap();
