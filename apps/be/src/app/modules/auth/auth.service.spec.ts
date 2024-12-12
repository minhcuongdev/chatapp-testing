import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let authService: AuthService;
  let userRepo: Repository<User>;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userRepo = module.get<Repository<User>>(getRepositoryToken(User));
    jwtService = module.get<JwtService>(JwtService);
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Resets all spied/mocked methods
  });

  describe('register', () => {
    it('should hash the password and save the user', async () => {
      const dto = {
        email: 'test@example.com',
        name: 'Test User',
        password: 'password123',
      };
      const hashedPassword = 'hashedPassword';
      jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce(hashedPassword);

      const saveMock = jest.spyOn(userRepo, 'save').mockResolvedValueOnce(null);
      await authService.register(dto);
      expect(bcrypt.hash).toHaveBeenCalledWith(dto.password, 10);
      expect(userRepo.create).toHaveBeenCalledWith({
        email: dto.email,
        name: dto.name,
        password: hashedPassword,
      });
      expect(saveMock).toHaveBeenCalled();
    });
  });

  describe('login', () => {
    it('should return a token and user ID on successful login', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const user = {
        id: 1,
        email,
        password: 'hashedPassword',
      } as User;
      const token = 'testToken';

      jest.spyOn(userRepo, 'findOne').mockResolvedValueOnce(user);
      jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true);
      jest.spyOn(jwtService, 'sign').mockReturnValueOnce(token);

      const result = await authService.login(email, password);

      expect(userRepo.findOne).toHaveBeenCalledWith({ where: { email } });
      expect(bcrypt.compare).toHaveBeenCalledWith(password, user.password);
      expect(jwtService.sign).toHaveBeenCalledWith(
        { id: user.id, email: user.email },
        { secret: 'secret' },
      );
      expect(result).toEqual({ token, id: user.id });
    });

    it('should throw an UnauthorizedException if credentials are invalid', async () => {
      const email = 'test@example.com';
      const password = 'password123';

      jest.spyOn(userRepo, 'findOne').mockResolvedValueOnce(null);

      await expect(authService.login(email, password)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw an UnauthorizedException if password does not match', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const user = {
        id: 1,
        email,
        password: 'hashedPassword',
      } as User;

      jest.spyOn(userRepo, 'findOne').mockResolvedValueOnce(user);
      jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false);

      await expect(authService.login(email, password)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
