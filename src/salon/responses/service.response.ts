import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ServiceResponse implements IServiceResponse {
    @ApiProperty({ example: 1 })
    @Expose()
    id: number;

    @ApiProperty({ example: 666.69 })
    @Expose()
    price: number;

    @ApiProperty({ example: 'наращивание' })
    @Expose()
    type: string;
}

export interface IServiceResponse {
    id: number;
    type: string;
    price: number;
}
