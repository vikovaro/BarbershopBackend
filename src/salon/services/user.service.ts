import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserRequest } from '../requests/create.user.request';
import { IUserResponse } from '../responses/user.response';
import { UpdateUserRequest } from '../requests/update.user.request';
import { IGetUsersResponse } from '../responses/get.users.response';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async createUser(createUserRequest: CreateUserRequest): Promise<IUserResponse> {
        return await this.userRepository.createUser(createUserRequest);
    }

    async getUserById(id: number) {
        const user = await this.userRepository.getUserById(id);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

    async deleteUserById(id: number) {
        return await this.userRepository.deleteUserById(id);
    }

    async updateUserById(updateUserRequest: UpdateUserRequest): Promise<IUserResponse> {
        const user = await this.userRepository.getUserById(updateUserRequest.id);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return await this.userRepository.updateUserById(updateUserRequest);
    }

    async getUsersWithPagination(limit: number, offset: number): Promise<IGetUsersResponse> {
        return await this.userRepository.getUsersWithPagination(limit, offset);
    }
}
