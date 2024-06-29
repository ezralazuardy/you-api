import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, File } from '@nest-lab/fastify-multer';
import { JwtGuard } from '../auth/jwt.guard';
import { UserService } from './user.service';
import { UpdateUserProfileDto } from './dtos/update-user-profile.dto';
import { fileValidator } from './utils/validator';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('api/getProfile')
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  async getProfile(@Req() req: any) {
    return await this.userService.getUserProfile(req.user);
  }

  @Post('api/createProfile')
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.CREATED)
  async createProfile(
    @Req() req: any,
    @Body() updateUserProfileDto: UpdateUserProfileDto,
  ) {
    // create or update the user profile
    const profile = await this.createOrUpdateUserProfile(
      req,
      updateUserProfileDto,
    );

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Profile created successfully.',
      profile,
    };
  }

  @Put('api/updateProfile')
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  async updateProfile(
    @Req() req: any,
    @Body() updateUserProfileDto: UpdateUserProfileDto,
  ) {
    // create or update the user profile
    const profile = await this.createOrUpdateUserProfile(
      req,
      updateUserProfileDto,
    );

    return {
      statusCode: HttpStatus.OK,
      message: 'Profile updated successfully.',
      profile,
    };
  }

  @Put('api/updateAvatar')
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('image'))
  async updateAvatar(
    @Req() req: any,
    @UploadedFile(fileValidator()) image: File,
  ) {
    // update the avatar
    const avatar = await this.userService.updateAvatar(req.user, image);

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Avatar updated successfully.',
      avatar,
    };
  }

  @Delete('api/removeAvatar')
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('file'))
  async removeAvatar(@Req() req: any) {
    // remove the avatar
    const avatar = await this.userService.removeAvatar(req.user);

    return {
      statusCode: HttpStatus.OK,
      message: 'Avatar removed successfully.',
      avatar,
    };
  }

  private async createOrUpdateUserProfile(
    req: any,
    updateUserProfileDto: UpdateUserProfileDto,
  ) {
    // create or update the user profile
    const user = await this.userService.createOrUpdateUserProfile(
      req.user,
      updateUserProfileDto,
    );

    return await this.userService.getUserProfile(user);
  }
}
