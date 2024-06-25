import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async login(loginDto: LoginDto) {
    console.log(loginDto);
  }

  async logout() {
    console.log();
  }

  async refreshToken() {
    console.log();
  }

  async register(registerDto: RegisterDto) {
    console.log(registerDto);
  }
}
