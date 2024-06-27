import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema({
  timestamps: true,
})
export class Message {
  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  sender: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  receiver: string;

  @Prop({ required: true })
  data: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
