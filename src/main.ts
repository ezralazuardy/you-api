import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import compression from '@fastify/compress';

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

  // set the rabbitmq microservice
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL],
      queue: 'messages-queue',
      queueOptions: {
        durable: false,
      },
    },
  });

  // start the microservice
  await app.startAllMicroservices();

  // enable compression
  await app.register(compression);

  // start the app
  await app.listen(8000, '0.0.0.0');
}

bootstrap();
