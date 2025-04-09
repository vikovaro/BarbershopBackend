import { Expose } from 'class-transformer';
import { IsString, Min, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeRequest implements ICreateEmployeeRequest {
    @ApiProperty({ example: "Name Surname" })
    @IsString()
    @Expose()
    name: string;

    @ApiProperty({ example: "123456789" })
    @IsString()
    @Min(1)
    @Expose()
    employeePhone: string;

    @ApiProperty({ example: 1 })
    @IsInt()
    @Min(1)
    @Expose()
    userId: number;
}

export interface ICreateEmployeeRequest {
    name: string;
    employeePhone: string;
    userId: number;
}