import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateEmployeeRequest } from './requests/create.employee.request';
import { IEmployeeResponse } from './responses/employee.response';
import { CreateServiceRequest } from './requests/create.service.request';
import { IServiceResponse } from './responses/service.response';
import { CreateRecordRequest } from './requests/create.record.request';
import { EStatus } from './domain/status.enum';
import { IGetRecordsResponse } from './responses/get.records.response';
import { UpdateEmployeeRequest } from './requests/update.employee.request';
import { UpdateServiceRequest } from './requests/update.service.request';
import { UpdateRecordRequest } from './requests/update.record.request';
import { IGetEmployeesResponse } from './responses/get.employee.response';
import { IGetServiceResponse } from './responses/get.service.response';
import { IRecordResponse } from './responses/record.response';
import { CreateUserRequest } from './requests/create.user.request';
import { IUserResponse } from './responses/user.response';
import * as bcrypt from 'bcrypt';
import { UpdateUserRequest } from './requests/update.user.request';
import { IGetUsersResponse } from './responses/get.users.response';

@Injectable()
export class SalonRepository {
    constructor(private readonly prisma: PrismaClient) {
    }

    // USER
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

    // EMPLOYEE
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
                employeePhone: updateEmployeeRequest.employeePhone ? updateEmployeeRequest.employeePhone : undefined,
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

    async getEmployeesWithPagination(limit: number, offset: number): Promise<IGetEmployeesResponse> {
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

    // SERVICE

    async createService(createServiceRequest: CreateServiceRequest): Promise<IServiceResponse> {
        const service = await this.prisma.service.create({
            data: {
                type: createServiceRequest.type,
                price: createServiceRequest.price,
            },
        });

        // Decimal из Prisma нативно не конвертируется в Number из JS
        const roundedPrice = parseFloat(service.price.toString()).toFixed(2);
        const formattedPrice = parseFloat(roundedPrice);

        return {
            ...service,
            price: formattedPrice,
        };
    }

    async getServiceById(id: number) {
        return this.prisma.service.findUnique({
            where: {
                id: id,
            },
        });
    }

    async getServicesWithPagination(limit: number, offset: number): Promise<IGetServiceResponse> {
        const services = await this.prisma.service.findMany({
            skip: offset,
            take: limit,
        });

        const totalCount = await this.prisma.service.count();
        const formattedServices = services.map((service) => ({
            ...service,
            price: Math.round(parseFloat(service.price.toString()) * 100) / 100,
        }));

        return {
            services: formattedServices,
            count: totalCount,
        };
    }

    async updateService(updateServiceRequest: UpdateServiceRequest) {
        const service = await this.prisma.service.update({
            where: {
                id: updateServiceRequest.id,
            },
            data: {
                type: updateServiceRequest.type ? updateServiceRequest.type : undefined,
                price: updateServiceRequest.price ? updateServiceRequest.price : undefined,
            },
        });

        const roundedPrice = parseFloat(service.price.toString()).toFixed(2);
        const formattedPrice = parseFloat(roundedPrice);

        return {
            ...service,
            price: formattedPrice,
        };
    }

    async deleteServiceById(id: number) {
        return this.prisma.service.delete({
            where: {
                id: id,
            },
        });
    }

    // RECORD
    async createRecord(createRecordRequest: CreateRecordRequest): Promise<IRecordResponse> {
        const record = await this.prisma.record.create({
            data: {
                clientName: createRecordRequest.clientName,
                clientPhone: createRecordRequest.clientPhone,
                appointmentDatetime: new Date(), // Возможен баг с часовым поясом
                status: EStatus.PENDING,
                employeeId: createRecordRequest.employeeId,
                serviceId: createRecordRequest.serviceId,
                notes: createRecordRequest.notes ? createRecordRequest.notes : undefined,
            },
            include: {
                service: true,
                employee: true,
            }
        });

        return {
            ...record,
            notes: record.notes ?? undefined,
            service: {
                ...record.service,
                price: parseFloat(parseFloat(record.service.price.toString()).toFixed(2)),
            }
        };
    }

    async getRecordById(id: number) {
        return this.prisma.record.findUnique({
            where: {
                id: id,
            },
            include: {
                service: true,
                employee: true,
            }
        });
    }

    async getRecordsWithPagination(
        limit: number,
        offset: number,
        status?: EStatus
    ): Promise<IGetRecordsResponse> {
        const records = await this.prisma.record.findMany({
            skip: offset,
            take: limit,
            where: status ? { status } : {},
            include: {
                employee: true,
                service: true,
            },
        });

        const totalCount = await this.prisma.record.count();

        const formattedRecords = records.map((record) => ({
            ...record,
            notes: record.notes ?? undefined,
            service: {
                ...record.service,
                price: Math.round(parseFloat(record.service.price.toString()) * 100) / 100,
            },
            employee: {
                ...record.employee,
            }
        }));

        return {
            records: formattedRecords,
            count: totalCount,
        };
    }


    async deleteRecordById(id: number) {
        return this.prisma.record.delete({
            where: {
                id: id,
            },
        });
    }

    async changeRecordStatus(id: number, status: EStatus) {
        return this.prisma.record.update({
            where: {
                id: id,
            },
            data: {
                status: status,
            },
        });
    }

    async updateRecord(updateRecordRequest: UpdateRecordRequest) {
        const record = await this.prisma.record.update({
            where: {
                id: updateRecordRequest.id,
            },
            data: {
                clientName: updateRecordRequest.clientName ? updateRecordRequest.clientName : undefined,
                clientPhone: updateRecordRequest.clientPhone ? updateRecordRequest.clientPhone : undefined,
                status: updateRecordRequest.status ? updateRecordRequest.status : undefined,
                employeeId: updateRecordRequest.employeeId ? updateRecordRequest.employeeId : undefined,
                serviceId: updateRecordRequest.serviceId ? updateRecordRequest.serviceId : undefined,
                notes: updateRecordRequest.notes ? updateRecordRequest.notes : undefined,
            },
            include: {
                service: true,
                employee: true,
            }
        });

        return {
            ...record,
            notes: record.notes ?? undefined,
            service: {
                ...record.service,
                price: parseFloat(parseFloat(record.service.price.toString()).toFixed(2)),
            }
        };
    }

    async hasEmployeeRecords(employeeId: number): Promise<boolean> {
        const count = await this.prisma.record.count({
            where: {
                employeeId: employeeId,
            },
        });
        return count > 0;
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
}