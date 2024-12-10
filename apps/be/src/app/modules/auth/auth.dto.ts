import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Email of the user',
  })
  @IsString()
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiProperty({
    example: 'user',
    description: 'name of the user',
  })
  @IsString()
  @IsNotEmpty({ message: 'Name must not be empty' })
  name: string;

  @ApiProperty({ example: 'password123', description: 'Password of the user' })
  @IsString()
  @IsNotEmpty({ message: 'Password must not be empty' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}

export class LoginDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Email of the user',
  })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiProperty({ example: 'password123', description: 'Password of the user' })
  @IsNotEmpty({ message: 'Password must not be empty' })
  password: string;
}
