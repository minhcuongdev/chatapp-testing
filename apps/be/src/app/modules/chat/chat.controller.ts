import { Controller, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../utils/jwt-auth.guard';
import { User } from '../../entities/user.entity';
import { CreateRoomDto, SendMessageDto } from './chat.dto';

@ApiTags('Chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('create-room')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a room for 1v1 chat' })
  @ApiResponse({
    status: 201,
    description: 'The room has been successfully created.',
  })
  @ApiBody({
    description: 'User IDs for the two participants',
    type: CreateRoomDto,
    schema: {
      example: {
        user1Id: 1,
        user2Id: 2,
      },
    },
  })
  async createRoom(@Body() data: CreateRoomDto) {
    return this.chatService.createRoom(data.user1Id, data.user2Id);
  }

  @Post('send-message/:roomId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Send a message to a room' })
  @ApiParam({ name: 'roomId', type: Number, description: 'Room ID' })
  @ApiBody({
    description: 'Message content and user ID',
    type: SendMessageDto,
    schema: {
      example: {
        userId: 1,
        message: 'Hello!',
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Message sent successfully.',
  })
  async sendMessage(
    @Param('roomId') roomId: number,
    @Body() data: SendMessageDto
  ) {
    return this.chatService.sendMessage(roomId, data.userId, data.message);
  }
}
