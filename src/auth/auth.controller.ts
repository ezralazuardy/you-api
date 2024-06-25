import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';

@Controller()
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('api/login')
  async login(@Body() loginDto: LoginDto) {
    console.log(loginDto);
  }

  @Post('api/register')
  async register(@Body() registerDto: RegisterDto) {
    console.log(registerDto);
  }
}
