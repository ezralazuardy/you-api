import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { JwtGuard } from './jwt.guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('api/register')
  @HttpCode(201)
  async register(@Body() registerDto: RegisterDto) {
    let user = await this.authService.register(registerDto);
    user = await this.authService.refreshToken(user);
    return {
      statusCode: 201,
      message: `User with email ${user.email} has been created successfully!`,
      token: user.refreshToken,
    };
  }

  @Post('api/login')
  @HttpCode(200)
  async login(@Body() loginDto: LoginDto) {
    let user = await this.authService.login(loginDto);
    user = await this.authService.refreshToken(user);
    return {
      statusCode: 200,
      message: 'Login successful!',
      token: user.refreshToken,
    };
  }

  @Delete('api/logout')
  @UseGuards(JwtGuard)
  @HttpCode(200)
  async logout(@Request() req: any) {
    const user = await this.authService.logout(req.user);
    return {
      statusCode: 200,
      message: `User with email ${user.email} has been logged out successfully!`,
    };
  }

  @Put('api/refresh')
  @UseGuards(JwtGuard)
  @HttpCode(200)
  async refreshToken(@Request() req: any) {
    const user = await this.authService.refreshToken(req.user);
    return {
      statusCode: 200,
      message: `Token for user with email ${user.email} has been refreshed successfully!`,
      token: user.refreshToken,
    };
  }
}
