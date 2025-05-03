import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class EmployeeResponse implements IEmployeeResponse {
    @ApiProperty({ example: 1 })
    @Expose()
    id: number;

    @ApiProperty({ example: 'Name Surname' })
    @Expose()
    name: string;

    @ApiProperty({ example: '1234567' })
    @Expose()
    employeePhone: string;
}

export interface IEmployeeResponse {
    id: number;
    name: string;
    employeePhone: string;
}
