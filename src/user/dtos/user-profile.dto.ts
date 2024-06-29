import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';
import { HoroscopeDto } from '../utils/dtos/horoscope.dto';
import { ZodiacDto } from '../utils/dtos/zodiac.dto';

export class UserProfileBirthdayDto {
  readonly timestamp: number; // in unix timestamp

  readonly formatted: string; // in YYYY-MM-DD format
}

export class UserProfileDto {
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
  @IsString()
  readonly avatar: string; // in url format

  @IsNotEmpty()
  @IsNumber()
  readonly height: number; // in cm

  @IsNotEmpty()
  @IsNumber()
  readonly weight: number; // in kg

  readonly interest?: string;

  readonly horoscope?: HoroscopeDto;

  readonly zodiac?: ZodiacDto;

  readonly birthday?: UserProfileBirthdayDto;
}
