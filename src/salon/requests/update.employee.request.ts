import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Expose } from 'class-transformer';

export class UpdateEmployeeRequest implements IUpdateEmployeeRequest {
    @ApiProperty({ example: 1 })
    @IsInt()
    @Min(1)
    @Expose()
    id: number;

    @ApiPropertyOptional({ example: 'Имя Фамилия' })
    @IsString()
    @IsOptional()
    @Expose()
    name?: string;

    @ApiProperty({ example: 'login' })
    @IsString()
    @IsOptional()
    login?: string;

    @ApiPropertyOptional({ example: '+79991114455' })
    @IsString()
    @IsOptional()
    @Expose()
    employeePhone?: string;
}

export interface IUpdateEmployeeRequest {
    id: number;
    name?: string;
    login?: string;
    employeePhone?: string;
}
