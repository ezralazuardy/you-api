import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from '../user/schemas/user.schema';
import { Message } from './schemas/message.schema';
import { MessageDto } from './dtos/message.dto';

@Injectable()
export class MessageService {
  constructor(
    @Inject('MESSAGE_SERVICE') private readonly rabbitClient: ClientProxy,
    @InjectModel(Message.name) private readonly message: Model<Message>,
  ) {}

  async getAllMessages(user: UserDocument) {
    // get the messages sent by user, and group it by receiver
    const messages = await this.message.aggregate([
      { $match: { sender: user._id } },
      { $sort: { createdAt: 1 } },
      {
        $group: {
          _id: '$receiver',
          messages: {
            $push: '$$ROOT',
          },
        },
      },
    ]);

    // convert aggregation cursor to array
    return messages.map((result) => result);
  }

  async sendMessage(messageDto: MessageDto) {
    return this.rabbitClient.emit('user_message', messageDto);
  }
}
