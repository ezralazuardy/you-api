import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('api/login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @Post('api/logout')
  async logout() {
    return await this.authService.logout();
  }

  @Post('api/refresh-token')
  async refreshToken() {
    return await this.authService.refreshToken();
  }

  @Post('api/register')
  @HttpCode(201)
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto);
  }
}
