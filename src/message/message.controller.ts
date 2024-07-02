import {
  Body,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { JwtGuard } from '../auth/jwt.guard';
import { MessageService } from './message.service';
import { SendMessageDto } from './dtos/send-message.dto';
import { UserService } from 'src/user/user.service';
import { MessageDto } from './dtos/message.dto';

@Controller()
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    private readonly userService: UserService,
  ) {}

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
    // get the receiver
    const receiver = await this.userService.getUserById(
      sendMessageDto.receiver,
    );

    // check if receiver exists
    if (!receiver) {
      throw new NotFoundException('Receiver is not found.');
    }

    // set the message data
    const data = {
      sender: req.user._id as string,
      receiver: receiver._id as string,
      data: sendMessageDto.data as string,
    };

    // send the message
    await this.messageService.sendMessage(data);

    return {
      statusCode: 201,
      message: 'Message sent successfully.',
      data,
    };
  }

  @EventPattern('message_sent')
  async handleUserMessage(@Payload() messageDto: MessageDto) {
    await this.messageService.persistUserMessage(messageDto);
  }
}
