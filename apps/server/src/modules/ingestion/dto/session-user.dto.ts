import { ISessionUser } from '@bugpilot/common/types/base-event';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsObject,
  IsEmail,
} from 'class-validator';

export class SessionUserDto implements ISessionUser {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsObject()
  @IsOptional()
  moreInfo?: Record<any, any>;
}
