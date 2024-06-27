import { IsNotEmpty, IsString } from 'class-validator';

export class SendMessageDto {
  @IsNotEmpty()
  @IsString()
  readonly receiver: string;

  @IsNotEmpty()
  @IsString()
  readonly data: string;
}
