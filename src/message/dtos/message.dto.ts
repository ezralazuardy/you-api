import { IsNotEmpty, IsString } from 'class-validator';

export class MessageDto {
  @IsNotEmpty()
  @IsString()
  readonly sender: string;

  @IsNotEmpty()
  @IsString()
  readonly receiver: string;

  @IsNotEmpty()
  @IsString()
  readonly data: string;
}
