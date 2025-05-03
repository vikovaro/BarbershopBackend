import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserResponse implements IUserResponse {
    @ApiProperty({ example: 1 })
    @Expose()
    id: number;

    @ApiProperty({ example: 'user@example.com' })
    @Expose()
    login: string;

    @ApiProperty({ example: '+79001234567' })
    @Expose()
    phone: string;

    @ApiProperty({ example: 'John Doe' })
    @Expose()
    full_name: string;
}

export interface IUserResponse {
    id: number;
    login: string;
    phone: string;
    full_name: string;
}
