import { EStatus } from '../domain/status.enum';
import { Expose, Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, Min } from 'class-validator';
import { Optional } from '@nestjs/common';

export class GetRecordsPagination implements IGetRecordsPagination {
    @Type(() => Number)
    @ApiProperty({ type: Number, example: 234 })
    @Expose()
    @IsInt()
    @Min(0)
    limit: number;

    @Type(() => Number)
    @ApiProperty({ type: Number, example: 234 })
    @Expose()
    @IsInt()
    @Min(0)
    offset: number;

    @ApiPropertyOptional({ enum: EStatus, example: EStatus.COMPLETED })
    @Expose()
    @Optional()
    @IsEnum(EStatus)
    status?: EStatus;
}

export interface IGetRecordsPagination {
    limit: number;
    offset: number;
    status?: EStatus;
}
