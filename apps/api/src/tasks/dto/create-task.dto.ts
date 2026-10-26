import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
  ArrayNotEmpty,
  Matches,
} from 'class-validator';
import { Type } from 'class-transformer';
import { IsNotPastDate } from '../decorator/is-not-past-date.decorator';
import { IsNotPastDateTime } from '../decorator/is-not-past-time.decorator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(191)
  title!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(5000)
  details!: string;

  @IsNotEmpty()
  @Matches(/^([01]\d|2[0-3]):[0-5]\d$/, {
    message: 'time must be in HH:mm format (e.g. 14:30)',
  })
  @IsNotPastDateTime({ message: 'task time must be at least 2 hours from now' })
  time!: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'date must be in YYYY-MM-DD format (e.g. 2026-10-25)',
  })
  @IsNotPastDate({ message: 'date cannot be in the past' })
  date!: string;

  @IsOptional()
  @IsString()
  @MaxLength(191)
  subtask?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(100)
  percentage?: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('4', { each: true })
  memberIds!: string[];

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(-840)
  @Max(840)
  tzOffset?: number;
}