import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class GetPaginationRequest implements IGetPaginationRequest {
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
}

export interface IGetPaginationRequest {
    limit: number;
    offset: number;
}
