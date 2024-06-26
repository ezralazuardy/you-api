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

  async getUserByUsername(username: string): Promise<UserDocument> {
    return await this.user.findOne({ username: username });
  }

  async validateUserById(id: string): Promise<boolean> {
    return (await this.user.exists({ _id: id })) !== null;
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserDocument> {
    const createdUser = new this.user(createUserDto);
    return await createdUser.save();
  }

  async removeRefreshToken(user: UserDocument): Promise<UserDocument> {
    await this.user.findByIdAndUpdate(user._id, {
      refreshToken: null,
    });
    return await this.user.findById(user._id);
  }

  async updateRefreshToken(
    user: UserDocument,
    refreshToken: string,
  ): Promise<UserDocument> {
    await this.user.findByIdAndUpdate(user._id, {
      refreshToken: refreshToken,
    });
    return await this.user.findById(user._id);
  }
}
