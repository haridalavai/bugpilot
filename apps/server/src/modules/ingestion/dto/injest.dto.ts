import {
  IsString,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ErrorIngestDto } from './error-ingest.dto';

export class IngestEventDto {
  @IsString()
  @IsNotEmpty()
  eventType: string;

  @Type(() => ErrorIngestDto)
  @ValidateNested()
  @IsNotEmpty()
  payload: ErrorIngestDto;
}
