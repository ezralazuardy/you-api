import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/jwt.guard';
import { MessageService } from './message.service';
import { SendMessageDto } from './dtos/send-message.dto';

@Controller()
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get('api/viewMessage')
  @UseGuards(JwtGuard)
  @HttpCode(200)
  async viewMessage(@Request() req: any) {
    return await this.messageService.getAllMessages(req.user);
  }

  @Post('api/sendMessage')
  @UseGuards(JwtGuard)
  @HttpCode(201)
  async sendMessage(
    @Request() req: any,
    @Body() sendMessageDto: SendMessageDto,
  ) {
    const data = {
      sender: req.user._id,
      receiver: sendMessageDto.receiver,
      data: sendMessageDto.data,
    };
    await this.messageService.sendMessage(data);
    return data;
  }
}
