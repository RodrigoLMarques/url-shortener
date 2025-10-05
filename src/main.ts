import { MikroORM } from '@mikro-orm/postgresql';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvService } from './modules/env/env.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const envService = app.get(EnvService);
  const mikroORM = app.get(MikroORM);

  mikroORM.getMigrator().up();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidNonWhitelisted: true,
      whitelist: true,
    }),
  );

  const port = envService.get('PORT');
  await app.listen(port);
}
bootstrap();
