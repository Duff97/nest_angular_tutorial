import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CommentsModule } from './comments/comments.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule, 
    CommentsModule, 
    MongooseModule.forRoot(process.env.DATABASE_STRING)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
