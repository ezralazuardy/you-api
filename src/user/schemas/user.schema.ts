import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

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
  birthday?: Date;
  @Prop({ required: false })
  height?: number;
  @Prop({ required: false })
  weight?: number;
  @Prop({ required: false })
  interest?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
