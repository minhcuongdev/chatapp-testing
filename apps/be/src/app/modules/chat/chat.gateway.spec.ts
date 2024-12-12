import { Test, TestingModule } from '@nestjs/testing';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { Server, Socket } from 'socket.io';
import { Message } from '../../entities/message.entity';
import { Room } from '../../entities/room.entity';

describe('ChatGateway', () => {
  let gateway: ChatGateway;
  let chatService: ChatService;
  let mockServer: Partial<Server>;

  beforeEach(async () => {
    const mockChatService = {
      getRoomsByUserId: jest.fn(),
      createRoom: jest.fn(),
      sendMessage: jest.fn(),
      getMessagesInRoom: jest.fn(),
    };

    mockServer = {
      emit: jest.fn(),
      to: jest.fn().mockReturnThis(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatGateway,
        { provide: ChatService, useValue: mockChatService },
      ],
    }).compile();

    gateway = module.get<ChatGateway>(ChatGateway);
    chatService = module.get<ChatService>(ChatService);
    gateway.server = mockServer as Server;
  });

  it('should initialize WebSocket server', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    gateway.afterInit(mockServer as Server);
    expect(consoleSpy).toHaveBeenCalledWith('Socket server initialized');
    consoleSpy.mockRestore();
  });

  it('should log client connection', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    const mockClient = { id: '12345' } as Socket;
    gateway.handleConnection(mockClient);
    expect(consoleSpy).toHaveBeenCalledWith('Client connected: 12345');
    consoleSpy.mockRestore();
  });

  it('should log client disconnection', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    const mockClient = { id: '12345' } as Socket;
    gateway.handleDisconnect(mockClient);
    expect(consoleSpy).toHaveBeenCalledWith('Client disconnected: 12345');
    consoleSpy.mockRestore();
  });

  it('should handle "getRooms" event', async () => {
    const mockClient = { emit: jest.fn() } as unknown as Socket;
    const mockRooms = [{ id: 1, name: 'Room 1' }] as Room[];
    jest
      .spyOn(chatService, 'getRoomsByUserId')
      .mockResolvedValueOnce(mockRooms);

    await gateway.handleGetRoom(mockClient, { userId: 1 });

    expect(chatService.getRoomsByUserId).toHaveBeenCalledWith(1);
    expect(mockClient.emit).toHaveBeenCalledWith('rooms', mockRooms);
  });

  it('should handle "createRoom" event', async () => {
    const mockRooms = [{ id: 1, name: 'Room 1' }] as Room[];
    jest.spyOn(chatService, 'createRoom').mockResolvedValueOnce(undefined);
    jest
      .spyOn(chatService, 'getRoomsByUserId')
      .mockResolvedValueOnce(mockRooms);

    await gateway.handleCreateRoom({ id: '1' } as Socket, {
      userId1: 1,
      userId2: 2,
    });

    expect(chatService.createRoom).toHaveBeenCalledWith(1, 2);
    expect(mockServer.emit).toHaveBeenCalledWith('room', mockRooms);
  });

  it('should handle "joinRoom" event', () => {
    const mockClient = { id: '12345', join: jest.fn() } as unknown as Socket;

    gateway.handleJoinRoom(mockClient, { roomId: 1 });

    expect(mockClient.join).toHaveBeenCalledWith('room-1');
    expect(mockServer.to('room-1').emit).toHaveBeenCalledWith(
      'joinRoom',
      '12345',
    );
  });

  it('should handle "sendMessage" event', async () => {
    const mockMessages = [{ id: 1, content: 'Hello' }] as Message[];
    jest.spyOn(chatService, 'sendMessage').mockResolvedValueOnce(undefined);
    jest
      .spyOn(chatService, 'getMessagesInRoom')
      .mockResolvedValueOnce(mockMessages);

    await gateway.handleSendMessage({ id: '1' } as Socket, {
      roomId: 1,
      userId: 1,
      message: 'Hello',
    });

    expect(chatService.sendMessage).toHaveBeenCalledWith(1, 1, 'Hello');
    expect(chatService.getMessagesInRoom).toHaveBeenCalledWith(1);
    expect(mockServer.emit).toHaveBeenCalledWith('messages', mockMessages);
  });

  it('should handle "getMessagesInRoom" event', async () => {
    const mockClient = { emit: jest.fn() } as unknown as Socket;
    const mockMessages: Message[] = [{ id: 1, content: 'Hello' }] as Message[];
    jest
      .spyOn(chatService, 'getMessagesInRoom')
      .mockResolvedValueOnce(mockMessages);

    await gateway.handleGetMessagesInRoom(mockClient, { roomId: 1 });

    expect(chatService.getMessagesInRoom).toHaveBeenCalledWith(1);
    expect(mockClient.emit).toHaveBeenCalledWith('messages', mockMessages);
  });
});
