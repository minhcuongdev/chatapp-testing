import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({ cors: true })
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  constructor(private chatService: ChatService) {}

  afterInit(server: Server) {
    console.log('Socket server initialized');
  }

  async handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    const rooms = await this.chatService.getRoomsByUserId(Number(client.id));
    this.server.emit('rooms', rooms);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('createRoom')
  async handleCreateRoom(
    client: Socket,
    @MessageBody() data: { userId1: number; userId2: number }
  ) {
    await this.chatService.createRoom(data.userId1, data.userId2);
    const rooms = await this.chatService.getRoomsByUserId(Number(client.id));
    this.server.emit('room', rooms);
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    client: Socket,
    @MessageBody() data: { roomId: number }
  ) {
    client.join(`room-${data.roomId}`);

    this.server.to(`room-${data.roomId}`).emit('joinRoom', client.id);
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    client: Socket,
    @MessageBody() data: { roomId: number; userId: number; message: string }
  ) {
    const message = await this.chatService.sendMessage(
      data.roomId,
      data.userId,
      data.message
    );

    this.server.to(`room-${data.roomId}`).emit('newMessage', message);
  }

  @SubscribeMessage('getMessagesInRoom')
  async handleGetMessagesInRoom(
    client: Socket,
    @MessageBody() data: { roomId: number }
  ) {
    const messages = await this.chatService.getMessagesInRoom(data.roomId);
    client.emit('messages', messages);
  }
}
