import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly user: Model<User>) {}

  async getAllUsers(): Promise<User[]> {
    return await this.user.find();
  }

  async getUserById(id: string): Promise<User> {
    return await this.user.findById(id);
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.user(createUserDto);
    return await createdUser.save();
  }
}
