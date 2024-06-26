import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ unique: true, required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: false })
  name?: string;

  @Prop({ required: false })
  avatar?: string;

  @Prop({ required: false })
  birthday?: number;

  @Prop({ required: false })
  height?: number;

  @Prop({ required: false })
  weight?: number;

  @Prop({ required: false })
  interest?: string;

  @Prop({ required: false })
  refreshToken?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
