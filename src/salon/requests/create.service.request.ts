import { IsInt, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CreateServiceRequest implements ICreateServiceRequest {
    @ApiProperty({ example: 666.123 })
    @IsInt()
    @Min(1)
    @Expose()
    price: number;

    @ApiProperty({ example: 'Укладка волос' })
    @IsString()
    @Expose()
    type: string;
}

export interface ICreateServiceRequest {
    type: string;
    price: number;
}
