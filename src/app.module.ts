import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth/auth.controller';
import { ProfileController } from './profile/profile.controller';
import { MessageController } from './message/message.controller';

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
    UserModule,
  ],
  controllers: [
    AppController,
    AuthController,
    ProfileController,
    MessageController,
  ],
  providers: [AppService],
})
export class AppModule {}
