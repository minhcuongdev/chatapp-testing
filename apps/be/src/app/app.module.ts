import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AppExceptionFilter } from './utils/exception.filter';
import { ChatModule } from './modules/chat/chat.module';
import { JwtAuthGuard } from './utils/jwt-auth.guard';
import { UsersModule } from './modules/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'user',
      password: 'password',
      database: 'authdb',
      autoLoadEntities: true,
      synchronize: true, // Disable in production
    }),
    AuthModule,
    ChatModule,
    UsersModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AppExceptionFilter,
    }
  ],
})
export class AppModule {}
