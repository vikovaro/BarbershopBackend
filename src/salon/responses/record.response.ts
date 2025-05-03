import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { EmployeeResponse, IEmployeeResponse } from './employee.response';
import { IServiceResponse, ServiceResponse } from './service.response';
import { Status } from '@prisma/client';

export class RecordResponse implements IRecordResponse {
    @ApiProperty({ example: 1 })
    @Expose()
    id: number;

    @ApiProperty({ example: 'Name Surname' })
    @Expose()
    clientName: string;

    @ApiProperty({ example: '123434' })
    @Expose()
    clientPhone: string;

    @ApiProperty({ example: 1 })
    @Expose()
    employeeId: number;

    @ApiProperty({ type: () => EmployeeResponse })
    @Expose()
    employee: EmployeeResponse;

    @ApiProperty({ example: 1 })
    @Expose()
    serviceId: number;

    @ApiProperty({ type: () => ServiceResponse })
    @Expose()
    service: ServiceResponse;

    @ApiProperty()
    @Expose()
    appointmentDatetime: Date;

    @ApiProperty()
    status: Status;

    @ApiProperty({ example: 'Additional notes about the appointment', required: false })
    @Expose()
    notes?: string;
}

export interface IRecordResponse {
    id: number;
    clientName: string;
    clientPhone: string;
    employeeId: number;
    employee: IEmployeeResponse;
    serviceId: number;
    service: IServiceResponse;
    appointmentDatetime: Date;
    status: Status;
    notes?: string;
}
