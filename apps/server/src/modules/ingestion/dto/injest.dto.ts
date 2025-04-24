import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsArray,
  IsObject,
} from 'class-validator';
import {
  ErrorPayload,
  IncomingEvent,
  StacktraceFrame,
  DeviceInfo,
} from '@bugpilot/common';

export class IngestEventDto {
  // @IsString()
  // @IsNotEmpty()
  // eventType: string;

  // @IsString()
  // @IsNotEmpty()
  // timestamp: string;

  // @IsString()
  // @IsNotEmpty()
  // sessionId: string;

  // @IsString()
  // @IsNotEmpty()
  // source: string;

  // @IsNumber()
  // @IsNotEmpty()
  // type: number;

  // @IsString()
  // @IsNotEmpty()
  // name: string;

  // @IsString()
  // @IsNotEmpty()
  // message: string;

  // @IsString()
  // @IsOptional()
  // level?: string;

  // @IsString()
  // @IsOptional()
  // environment?: string;

  // @IsArray()
  // @IsOptional()
  // stacktrace?: StacktraceFrame[];

  // @IsArray()
  // @IsOptional()
  // tags?: string[];

  // @IsObject()
  // @IsOptional()
  // user?: Record<any, any>;

  // @IsObject()
  // @IsOptional()
  // extra?: Record<any, any>;

  // @IsObject()
  // @IsOptional()
  // device?: DeviceInfo;

  // @IsArray()
  // @IsOptional()
  // breadcrumbs?: Record<any, any>[];

  @IsString()
  @IsNotEmpty()
  eventType: string;

  @IsObject()
  @IsNotEmpty()
  payload: IncomingEvent;
}
