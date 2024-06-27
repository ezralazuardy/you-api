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
    @Inject('MESSAGES_SERVICE') private readonly rabbitClient: ClientProxy,
    @InjectModel(Message.name) private readonly message: Model<Message>,
  ) {}

  async getAllMessages(user: UserDocument) {
    // get the sender identifier
    const sender = user._id.toString();

    // get the messages sent by user,
    // group it based on receiver,
    // and order by creation time (asc)
    return await this.message.aggregate([
      {
        $match: {
          sender,
        },
      },
      {
        $group: {
          _id: '$receiver',
          messages: { $push: '$$ROOT' },
        },
      },
      {
        $project: {
          _id: 0,
          receiver: '$_id',
          messages: 1,
        },
      },
    ]);
  }

  async sendMessage(messageDto: MessageDto) {
    this.rabbitClient.emit<MessageDto>('message_sent', messageDto);
  }
}
