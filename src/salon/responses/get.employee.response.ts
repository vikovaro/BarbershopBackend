import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { EmployeeResponse, IEmployeeResponse } from './employee.response';

export class GetEmployeesResponse implements IGetEmployeesResponse {
    @ApiProperty({ example: 10 })
    @Expose()
    count: number;

    @ApiProperty({ isArray: true, type: () => EmployeeResponse, nullable: true })
    @Exclude()
    employees: EmployeeResponse[];
}

export interface IGetEmployeesResponse {
    employees: IEmployeeResponse[];
    count: number;
}
