import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateEmployeeRequest } from '../requests/create.employee.request';
import { IEmployeeResponse } from '../responses/employee.response';
import { UpdateEmployeeRequest } from '../requests/update.employee.request';
import { IGetEmployeesResponse } from '../responses/get.employee.response';

@Injectable()
export class EmployeeRepository {
    constructor(private readonly prisma: PrismaClient) {}

    async createEmployee(createEmployeeRequest: CreateEmployeeRequest): Promise<IEmployeeResponse> {
        return this.prisma.employee.create({
            data: {
                name: createEmployeeRequest.name,
                employeePhone: createEmployeeRequest.employeePhone,
                userId: createEmployeeRequest.userId,
            },
        });
    }

    async deleteEmployeeById(id: number) {
        return this.prisma.employee.delete({
            where: {
                id: id,
            },
        });
    }

    async updateEmployee(updateEmployeeRequest: UpdateEmployeeRequest) {
        return this.prisma.employee.update({
            where: {
                id: updateEmployeeRequest.id,
            },
            data: {
                name: updateEmployeeRequest.name ? updateEmployeeRequest.name : undefined,
                employeePhone: updateEmployeeRequest.employeePhone
                    ? updateEmployeeRequest.employeePhone
                    : undefined,
            },
        });
    }

    async getEmployeeById(id: number) {
        return this.prisma.employee.findUnique({
            where: {
                id: id,
            },
        });
    }

    async getEmployeesWithPagination(
        limit: number,
        offset: number,
    ): Promise<IGetEmployeesResponse> {
        const employees = await this.prisma.employee.findMany({
            skip: offset,
            take: limit,
        });

        const totalCount = await this.prisma.employee.count();

        return {
            employees: employees,
            count: totalCount,
        };
    }
}
