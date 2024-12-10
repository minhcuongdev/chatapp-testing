import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';
import { Room } from '../../entities/room.entity';
import { Message } from '../../entities/message.entity';
import { User } from '../../entities/user.entity';
import { JwtAuthGuard } from '../../utils/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Room, Message, User])],
  controllers: [ChatController],
  providers: [ChatService, ChatGateway, JwtAuthGuard],
})
export class ChatModule {}
