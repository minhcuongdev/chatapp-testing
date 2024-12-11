import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { Room } from '../../entities/room.entity';
import { Message } from '../../entities/message.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Room) private roomRepo: Repository<Room>,
    @InjectRepository(Message) private messageRepo: Repository<Message>, // Inject message repository
  ) {}

  async createRoom(user1Id: number, user2Id: number): Promise<Room> {
    const user1 = await this.userRepo.findOne({ where: { id: user1Id } });
    const user2 = await this.userRepo.findOne({ where: { id: user2Id } });

    delete user1.password;
    delete user2.password;

    if (!user1 || !user2) {
      throw new NotFoundException('One or both users not found');
    }

    const room = new Room();
    room.name = `room-${user1Id}-${user2Id}`;

    const existRoom = await this.roomRepo.findOne({
      where: { name: room.name },
    });

    room.users = [user1, user2];

    if (existRoom) {
      existRoom.users = [user1, user2];
      return existRoom;
    }

    return this.roomRepo.save(room);
  }

  async getRoomsByUserId(userId: number): Promise<Room[]> {
    const user = await this.userRepo.findOne({
      where: { id: userId },
      relations: ['rooms'],
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user.rooms;
  }

  async sendMessage(
    roomId: number,
    userId: number,
    content: string,
  ): Promise<Message> {
    const room = await this.roomRepo.findOne({
      where: { id: roomId },
      relations: ['users'],
    });

    if (!room) {
      throw new NotFoundException('Room not found');
    }

    const user = room.users.find((user) => user.id === userId);
    if (!user) {
      throw new NotFoundException('User not part of the room');
    }

    const message = new Message();
    message.content = content;
    message.user = user;
    message.room = room;
    message.createdAt = new Date();

    return this.messageRepo.save(message);
  }

  async getMessagesInRoom(roomId: number): Promise<Message[]> {
    const messages = await this.messageRepo.find({
      where: { room: { id: roomId } },
      relations: ['user'],
      order: { createdAt: 'ASC' },
    });

    const newMessages = messages.map((message) => {
      delete message.user.password;
      return message;
    });

    return newMessages;
  }
}
