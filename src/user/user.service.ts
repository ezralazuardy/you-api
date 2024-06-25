import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly user: Model<User>) {}

  async getAllUsers(): Promise<UserDocument[]> {
    return await this.user.find();
  }

  async getUserById(id: string): Promise<UserDocument> {
    return await this.user.findById(id);
  }

  async getUserByEmail(email: string): Promise<UserDocument> {
    return await this.user.findOne({ email: email });
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserDocument> {
    const createdUser = new this.user(createUserDto);
    return await createdUser.save();
  }
}
