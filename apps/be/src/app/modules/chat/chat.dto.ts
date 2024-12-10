import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateRoomDto {
  @ApiProperty({
    example: 1,
    description: 'Id of the user1',
  })
  @IsNumber()
  user1Id: number;

  @ApiProperty({
    example: 2,
    description: 'Id of the user2',
  })
  @IsNumber()
  user2Id: number;
}

export class SendMessageDto {
  @ApiProperty({
    example: 1,
    description: 'Id of the user',
  })
  @IsNumber()
  userId: number;

  @ApiProperty({
    example: 'message',
    description: 'massage of the user',
  })
  @IsString()
  message: string;
}
