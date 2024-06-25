import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

/**
 * Get the database URI from the environment variables.
 * @returns The database URI.
 */
function getDatabaseUri(): string {
  const databaseUser = process.env.DATABASE_USER;
  const databasePassword = process.env.DATABASE_PASSWORD;
  const databaseCluster = process.env.DATABASE_CLUSTER;
  const databaseHost = process.env.DATABASE_HOST;
  return `mongodb+srv://${databaseUser}:${databasePassword}@${databaseCluster}.${databaseHost}/?retryWrites=true&w=majority&appName=${databaseCluster}`;
}

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(getDatabaseUri()),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
