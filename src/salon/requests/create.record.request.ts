import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Min, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';

export class CreateRecordRequest implements ICreateRecordRequest {
    @ApiProperty({ example: 'Name Surname' })
    @IsString()
    @Expose()
    clientName: string;

    @ApiProperty({ example: '12345678' })
    @IsString()
    @Min(1)
    @Expose()
    clientPhone: string;

    @ApiProperty({ example: 1 })
    @IsInt()
    @Min(1)
    @Expose()
    employeeId: number;

    @ApiProperty({ example: 1 })
    @IsInt()
    @Min(1)
    @Expose()
    serviceId: number;

    @ApiProperty({ example: 'Additional notes about the appointment', required: false })
    @IsString()
    @IsOptional()
    @Expose()
    notes?: string | undefined;
}

export interface ICreateRecordRequest {
    clientName: string;
    clientPhone: string;
    employeeId: number;
    serviceId: number;
    notes?: string | undefined;
}
