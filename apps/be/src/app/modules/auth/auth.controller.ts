import { Controller, Post, Body, Res, Req, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiResponse, ApiTags, ApiCookieAuth } from '@nestjs/swagger';
import { LoginDto, RegisterDto } from './auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiBody({ type: RegisterDto })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  async register(@Body() dto: RegisterDto) {
    await this.authService.register(dto);
    return { message: 'User registered successfully' };
  }

  @Post('login')
  @HttpCode(200)
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @ApiCookieAuth('jwt')
  async login(@Body() body: LoginDto, @Res({ passthrough: true }) res) {
    const { token } = await this.authService.login(body.email, body.password);
    res.cookie('jwt', token, { httpOnly: true });
    return { message: 'Login successful' };
  }
}
