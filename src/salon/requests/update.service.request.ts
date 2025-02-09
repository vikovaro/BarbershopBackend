import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Expose } from 'class-transformer';

export class UpdateServiceRequest implements IUpdateServiceRequest {
    @ApiProperty({ example: 1 })
    @IsInt()
    @Min(1)
    @Expose()
    id: number;

    @ApiPropertyOptional({ example: 666.123 })
    @IsInt()
    @IsOptional()
    @Min(1)
    @Expose()
    price?: number;

    @ApiPropertyOptional({ example: "ноготочки" })
    @IsString()
    @IsOptional()
    @Expose()
    type?: string;
}


export interface IUpdateServiceRequest {
    id: number;
    type?: string;
    price?: number;
}