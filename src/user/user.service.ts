import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { File } from '@nest-lab/fastify-multer';
import { AppService } from '../app.service';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserProfileDto } from './dtos/user-profile.dto';
import { UpdateUserProfileDto } from './dtos/update-user-profile.dto';
import { getNameInitialImageUrl } from './utils/image';
import { getHoroscope } from './utils/horoscope';
import { getZodiac } from './utils/zodiac';
import moment from 'moment-timezone';

@Injectable()
export class UserService {
  constructor(
    private readonly appService: AppService,
    @InjectModel(User.name) private readonly user: Model<User>,
  ) {}

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

  async getUserProfile(targetUser: UserDocument): Promise<UserProfileDto> {
    // get the user data
    const user = await this.user.findById(targetUser._id);

    // check if user is not found
    if (!user) {
      throw new NotFoundException('User not found!');
    }

    // initialize the birthday
    let birthday = null;

    // initialize the user horoscope
    let horoscope = null;

    // initialize the user zodiac
    let zodiac = null;

    // check if user has birthday
    if (user.birthday) {
      // convert the timestamp to moment
      birthday = moment.unix(user.birthday).tz(process.env.API_TIMEZONE);

      // get the horoscope
      horoscope = getHoroscope(birthday);

      // get the zodiac
      zodiac = getZodiac(birthday);
    }

    return {
      email: user.email,
      username: user.username,
      name: user.name ?? null,
      avatar: user.avatar
        ? this.appService.getFilePublicUrl(user.avatar)
        : getNameInitialImageUrl(user.name),
      height: user.height ?? null,
      weight: user.weight ?? null,
      interest: user.interest ?? null,
      horoscope,
      zodiac,
      birthday: !birthday
        ? null
        : {
            timestamp: user.birthday,
            formatted: birthday.format('YYYY-MM-DD'),
          },
    };
  }

  async createOrUpdateUserProfile(
    targetUser: UserDocument,
    updateUserProfileDto: UpdateUserProfileDto,
  ): Promise<UserDocument> {
    // update the user data
    await this.user.findByIdAndUpdate(targetUser._id, updateUserProfileDto);

    return await this.user.findById(targetUser._id);
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

  async updateAvatar(user: UserDocument, image: File): Promise<string> {
    const response = await this.appService.uploadFile(image);

    if (!response) {
      throw new InternalServerErrorException('Failed to upload image!');
    }

    await this.user.findByIdAndUpdate(user._id, {
      avatar: response.Key ?? null,
    });

    return this.appService.getFilePublicUrl(response.Key);
  }

  async removeAvatar(user: UserDocument): Promise<string> {
    await this.user.findByIdAndUpdate(user._id, {
      avatar: null,
    });

    return getNameInitialImageUrl(user.name);
  }
}
