import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IServiceResponse, ServiceResponse } from './service.response';

export class GetServiceResponse implements IGetServiceResponse {
    @ApiProperty({ example: 10 })
    @Expose()
    count: number;

    @ApiProperty({ isArray: true, type: () => ServiceResponse, nullable: true })
    @Exclude()
    services: ServiceResponse[];
}

export interface IGetServiceResponse {
    services: IServiceResponse[];
    count: number;
}
