import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Expose } from 'class-transformer';
import { EStatus } from '../domain/status.enum';

export class UpdateRecordRequest implements IUpdateRecordRequest {
    @ApiPropertyOptional({ example: 1 })
    @IsInt()
    @Expose()
    id: number;

    @ApiPropertyOptional({ example: 'cancelled' })
    @IsString()
    @IsEnum(EStatus)
    @IsOptional()
    @Expose()
    status?: EStatus;

    @ApiPropertyOptional({ example: "Name Surname" })
    @IsString()
    @IsOptional()
    @Expose()
    clientName?: string;

    @ApiPropertyOptional({ example: "12345678" })
    @IsString()
    @IsOptional()
    @Min(1)
    @Expose()
    clientPhone?: string;

    @ApiPropertyOptional({ example: 1 })
    @IsInt()
    @IsOptional()
    @Min(1)
    @Expose()
    employeeId?: number;

    @ApiPropertyOptional({ example: 1 })
    @IsInt()
    @IsOptional()
    @Min(1)
    @Expose()
    serviceId?: number;
}


export interface IUpdateRecordRequest {
    id: number;
    status?: EStatus,
    clientName?: string;
    clientPhone?: string;
    employeeId?: number;
    serviceId?: number;
}