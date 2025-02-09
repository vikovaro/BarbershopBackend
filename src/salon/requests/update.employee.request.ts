import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Expose } from 'class-transformer';

export class UpdateEmployeeRequest implements IUpdateEmployeeRequest {
    @ApiProperty({ example: 1 })
    @IsInt()
    @Min(1)
    @Expose()
    id: number;

    @ApiPropertyOptional({ example: "Name Surname" })
    @IsString()
    @IsOptional()
    @Expose()
    name?: string;

    @ApiPropertyOptional({ example: "123456789" })
    @IsString()
    @IsOptional()
    @Min(1)
    @Expose()
    employeePhone?: string;
}


export interface IUpdateEmployeeRequest {
    id: number;
    name?: string;
    employeePhone?: string;
}