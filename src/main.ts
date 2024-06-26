import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  // create the app
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  // starts listening for shutdown hooks
  app.enableShutdownHooks();

  // set global validation pipe
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(8000, '0.0.0.0');
}

bootstrap();
