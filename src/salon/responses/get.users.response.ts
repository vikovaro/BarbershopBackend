import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { UserResponse } from './user.response';

export class GetUsersResponse implements IGetUsersResponse {
    @ApiProperty({ isArray: true, type: () => UserResponse, nullable: true })
    @Exclude()
    users: UserResponse[];

    @ApiProperty({ example: 10 })
    @Expose()
    count: number;
}

export interface IGetUsersResponse {
    users: UserResponse[];
    count: number;
}