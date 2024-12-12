import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './auth.dto';
import { UnauthorizedException } from '@nestjs/common';

jest.mock('./auth.service.ts');
describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('register', () => {
    it('should call AuthService.register with correct data', async () => {
      const registerDto: RegisterDto = {
        email: 'test@example.com',
        name: 'Test User',
        password: 'password123',
      };

      jest.spyOn(authService, 'register').mockResolvedValueOnce(undefined);

      const result = await authController.register(registerDto);

      expect(authService.register).toHaveBeenCalledWith(registerDto);
      expect(result).toEqual({ message: 'User registered successfully' });
    });
  });

  describe('login', () => {
    it('should return a success message and set a cookie on valid credentials', async () => {
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'password123',
      };
      const token = 'mockToken';
      const userId = 1;
      const mockRes = {
        cookie: jest.fn(),
      };

      jest
        .spyOn(authService, 'login')
        .mockResolvedValueOnce({ token, id: userId });

      const result = await authController.login(loginDto, mockRes);

      expect(authService.login).toHaveBeenCalledWith(
        loginDto.email,
        loginDto.password,
      );
      expect(mockRes.cookie).toHaveBeenCalledWith('jwt', token, {
        httpOnly: true,
      });
      expect(result).toEqual({
        message: 'Login successful',
        userId,
      });
    });

    it('should throw an UnauthorizedException on invalid credentials', async () => {
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'wrongPassword',
      };
      const mockRes = {
        cookie: jest.fn(),
      };

      jest
        .spyOn(authService, 'login')
        .mockRejectedValueOnce(
          new UnauthorizedException('Invalid credentials'),
        );

      await expect(authController.login(loginDto, mockRes)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
