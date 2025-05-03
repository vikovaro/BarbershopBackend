import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateUserRequest } from '../requests/create.user.request';
import { IUserResponse } from '../responses/user.response';
import { UpdateUserRequest } from '../requests/update.user.request';
import { IGetUsersResponse } from '../responses/get.users.response';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository {
    constructor(private readonly prisma: PrismaClient) {}

    async createUser(createUserRequest: CreateUserRequest): Promise<IUserResponse> {
        return this.prisma.user.create({
            data: {
                login: createUserRequest.login,
                password: await bcrypt.hash(createUserRequest.password, 10),
                phone: createUserRequest.phone,
                full_name: createUserRequest.full_name,
            },
            select: {
                id: true,
                login: true,
                phone: true,
                full_name: true,
            },
        });
    }

    async getUserById(id: number) {
        return this.prisma.user.findUnique({
            where: {
                id: id,
            },
            select: {
                id: true,
                login: true,
                phone: true,
                full_name: true,
            },
        });
    }

    async updateUserById(updateUserRequest: UpdateUserRequest): Promise<IUserResponse> {
        return this.prisma.user.update({
            where: {
                id: updateUserRequest.id,
            },
            data: {
                login: updateUserRequest.login ?? undefined,
                password: updateUserRequest.password ? updateUserRequest.password : undefined,
                phone: updateUserRequest.phone ?? undefined,
                full_name: updateUserRequest.full_name ?? undefined,
            },
            select: {
                id: true,
                login: true,
                phone: true,
                full_name: true,
            },
        });
    }

    async getUsersWithPagination(limit: number, offset: number): Promise<IGetUsersResponse> {
        const users = await this.prisma.user.findMany({
            skip: offset,
            take: limit,
        });

        const totalCount = await this.prisma.user.count();

        return {
            users: users,
            count: totalCount,
        };
    }

    async deleteUserById(userId: number) {
        const employee = await this.prisma.employee.findUnique({
            where: {
                userId: userId,
            },
        });

        if (employee) {
            const hasRecords = await this.hasEmployeeRecords(employee.id);
            if (hasRecords) {
                throw new Error('Cannot delete user with active records.');
            }

            await this.prisma.employee.delete({
                where: {
                    id: employee.id,
                },
            });
        }

        return this.prisma.user.delete({
            where: {
                id: userId,
            },
        });
    }

    async hasEmployeeRecords(employeeId: number): Promise<boolean> {
        const count = await this.prisma.record.count({
            where: {
                employeeId: employeeId,
            },
        });
        return count > 0;
    }
}
