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

  async register(registerDto: RegisterDto): Promise<UserDocument> {
    // extract the data
    const { email, username, password } = registerDto;

    // check if email already exists
    if (await this.userService.getUserByEmail(email)) {
      throw new UnauthorizedException('User with this email already exists!');
    }

    // check if username already exists
    if (await this.userService.getUserByUsername(username)) {
      throw new UnauthorizedException(
        'User with this username already exists!',
      );
    }

    // hash the password
    const hashedPassword = await this.hashPassword(password);

    return await this.userService.createUser({
      email,
      username,
      password: hashedPassword,
    });
  }

  async login(loginDto: LoginDto): Promise<UserDocument> {
    // extract the data
    const { email, password } = loginDto;

    // get the user by email
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

    return user;
  }

  async logout(user: UserDocument): Promise<UserDocument> {
    return await this.userService.removeRefreshToken(user);
  }

  async refreshToken(user: UserDocument): Promise<UserDocument> {
    const token = await this.generateToken(user);
    return await this.userService.updateRefreshToken(user, token);
  }

  async generateToken(user: UserDocument) {
    return this.jwtService.sign({ id: user._id });
  }

  async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  async comparePassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }
}
