import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:4200',
  },
  cookie: true,
})
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
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('getRooms')
  async handleGetRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { userId: number },
  ) {
    const rooms = await this.chatService.getRoomsByUserId(Number(data.userId));
    client.emit('rooms', rooms);
  }

  @SubscribeMessage('createRoom')
  async handleCreateRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { userId1: number; userId2: number },
  ) {
    await this.chatService.createRoom(data.userId1, data.userId2);
    const rooms = await this.chatService.getRoomsByUserId(Number(client.id));
    this.server.emit('room', rooms);
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { roomId: number },
  ) {
    client.join(`room-${data.roomId}`);

    this.server.to(`room-${data.roomId}`).emit('joinRoom', client.id);
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { roomId: number; userId: number; message: string },
  ) {
    await this.chatService.sendMessage(data.roomId, data.userId, data.message);
    const messages = await this.chatService.getMessagesInRoom(data.roomId);
    this.server.emit('messages', messages);
  }

  @SubscribeMessage('getMessagesInRoom')
  async handleGetMessagesInRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { roomId: number },
  ) {
    const messages = await this.chatService.getMessagesInRoom(data.roomId);
    this.server.emit('messages', messages);
  }
}
