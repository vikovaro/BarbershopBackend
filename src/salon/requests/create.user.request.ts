import { ApiProperty } from '@nestjs/swagger';
import { IsString, Min } from 'class-validator';
import { Expose } from 'class-transformer';

export class CreateUserRequest implements ICreateUserRequest {
    @ApiProperty({ example: 'user@example.com' })
    @IsString()
    @Expose()
    login: string;

    @ApiProperty({ example: 'password123' })
    @IsString()
    @Min(6)
    @Expose()
    password: string;

    @ApiProperty({ example: '+79001234567' })
    @IsString()
    @Min(1)
    @Expose()
    phone: string;

    @ApiProperty({ example: 'John Doe' })
    @IsString()
    @Min(1)
    @Expose()
    full_name: string;
}

export interface ICreateUserRequest {
    login: string;
    password: string;
    phone: string;
    full_name: string;
}
