import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../entities/user.entity';
import { RegisterDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService
  ) {}

  async register(dto: RegisterDto): Promise<void> {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = this.userRepo.create({
      email: dto.email,
      name: dto.name,
      password: hashedPassword,
    });
    await this.userRepo.save(user);
  }

  async login(email: string, password: string): Promise<{ token: string }> {
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);
    return { token };
  }
}
