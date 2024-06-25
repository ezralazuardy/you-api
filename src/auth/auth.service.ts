import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { UserDocument } from '../user/schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userService.getUserByEmail(email);

    // check if user is not found
    if (!user) {
      throw new UnauthorizedException('There is no account under this email!');
    }

    // check if password missmatch
    if (!this.comparePassword(password, user.password)) {
      if (!user) {
        throw new UnauthorizedException('Invalid email or password!');
      }
    }

    return {
      token: await this.generateToken(user),
    };
  }

  async logout() {
    console.log();
  }

  async refreshToken() {
    console.log();
  }

  async generateToken(user: UserDocument) {
    return this.jwtService.sign({ id: user._id });
  }

  async register(registerDto: RegisterDto) {
    const { email, username, password } = registerDto;
    const hashedPassword = await this.hashPassword(password);
    const user = await this.userService.createUser({
      email,
      username,
      password: hashedPassword,
    });

    return {
      message: `User with email ${user.email} has been created successfully!`,
      token: await this.generateToken(user),
    };
  }

  async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  async comparePassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }
}
