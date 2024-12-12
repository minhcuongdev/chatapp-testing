import { Test, TestingModule } from '@nestjs/testing';
import { JwtStrategy } from './jwt.strategy';
import { UnauthorizedException } from '@nestjs/common';

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtStrategy],
    }).compile();

    jwtStrategy = module.get<JwtStrategy>(JwtStrategy);
  });

  describe('validate', () => {
    it('should return user data when payload is valid', async () => {
      const payload = { sub: 1, email: 'test@example.com' };

      const result = await jwtStrategy.validate(payload);

      expect(result).toEqual({
        userId: payload.sub,
        email: payload.email,
      });
    });

    it('should throw UnauthorizedException if payload is invalid', async () => {
      const payload = null; // Simulating an invalid payload

      await expect(jwtStrategy.validate(payload)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
