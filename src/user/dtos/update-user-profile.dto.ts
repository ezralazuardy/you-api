import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateUserProfileDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsNumber()
  readonly birthday: number; // in milliseconds

  @IsNotEmpty()
  @IsNumber()
  readonly height: number; // in cm

  @IsNotEmpty()
  @IsNumber()
  readonly weight: number; // in kg

  readonly interest?: string;
}
