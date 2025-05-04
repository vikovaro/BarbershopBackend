import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class EmployeeResponse implements IEmployeeResponse {
    @ApiProperty({ example: 1 })
    @Expose()
    id: number;

    @ApiProperty({ example: 'Имя Фамилия' })
    @Expose()
    name: string;

    @ApiProperty({ example: 'login' })
    @Expose()
    login: string;

    @ApiProperty({ example: '+79991114455' })
    @Expose()
    employeePhone: string;
}

export interface IEmployeeResponse {
    id: number;
    name: string;
    login: string;
    employeePhone: string;
}
