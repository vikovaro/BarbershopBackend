import { Injectable, NotFoundException } from '@nestjs/common';
import { SalonRepository } from './salon.repository';
import { IGetRecordsResponse } from './responses/get.records.response';
import { EStatus } from './domain/status.enum';
import { UpdateEmployeeRequest } from './requests/update.employee.request';
import { UpdateServiceRequest } from './requests/update.service.request';
import { UpdateRecordRequest } from './requests/update.record.request';
import { IGetEmployeesResponse } from './responses/get.employee.response';
import { CreateEmployeeRequest } from './requests/create.employee.request';
import { IEmployeeResponse } from './responses/employee.response';
import { CreateServiceRequest } from './requests/create.service.request';
import { CreateRecordRequest } from './requests/create.record.request';
import { GetRecordsPagination } from './requests/get.records.pagingation';
import { CreateUserRequest } from './requests/create.user.request';
import { IUserResponse } from './responses/user.response';
import { UpdateUserRequest } from './requests/update.user.request';

@Injectable()
export class SalonService {
    constructor(private readonly salonRepository: SalonRepository) {}

    // USER
    async createUser(createUserRequest: CreateUserRequest): Promise<IUserResponse> {
        return await this.salonRepository.createUser(createUserRequest);
    }

    async getUserById(id: number) {
        const user = await this.salonRepository.getUserById(id);

        if (!user) {
            throw new NotFoundException();
        }

        return user;
    }

    async deleteUserById(id: number) {
        return await this.salonRepository.deleteUserById(id);
    }

    async updateUserById(updateUserRequest: UpdateUserRequest): Promise<IUserResponse> {
        const user = await this.salonRepository.getUserById(updateUserRequest.id);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return await this.salonRepository.updateUserById(updateUserRequest);
    }

    // EMPLOYEE
    async createEmployee(createEmployeeRequest: CreateEmployeeRequest): Promise<IEmployeeResponse> {
        const user = await this.getUserById(createEmployeeRequest.userId);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        return await this.salonRepository.createEmployee(createEmployeeRequest);
    }

    async getEmployeeById(id: number) {
        const employee = await this.salonRepository.getEmployeeById(id);

        if (!employee) {
            throw new NotFoundException();
        }

        return employee;
    }

    async getEmployeesWithPagination(limit: number, offset: number): Promise<IGetEmployeesResponse> {
        return await this.salonRepository.getEmployeesWithPagination(limit, offset);
    }

    async updateEmployee(updateEmployeeRequest: UpdateEmployeeRequest) {
        const employee = await this.salonRepository.getEmployeeById(updateEmployeeRequest.id);

        if (!employee) {
            throw new NotFoundException();
        }

        return await this.salonRepository.updateEmployee(updateEmployeeRequest);
    }

    async deleteEmployeeById(id: number) {
        const employee = await this.salonRepository.getEmployeeById(id);

        if (!employee) {
            throw new NotFoundException();
        }

        return await this.salonRepository.deleteEmployeeById(id);
    }

    // SERVICE
    async createService(createServiceRequest: CreateServiceRequest) {
        return await this.salonRepository.createService(createServiceRequest);
    }

    async getServiceById(id: number) {
        const service = await this.salonRepository.getServiceById(id);

        if (!service) {
            throw new NotFoundException();
        }

        return service;
    }

    async deleteServiceById(id: number) {
        const service = await this.salonRepository.getServiceById(id);

        if (!service) {
            throw new NotFoundException();
        }

        return await this.salonRepository.deleteServiceById(id);
    }

    async updateService(updateServiceRequest: UpdateServiceRequest) {
        const service = await this.salonRepository.getServiceById(updateServiceRequest.id);

        if (!service) {
            throw new NotFoundException();
        }

        return await this.salonRepository.updateService(updateServiceRequest);
    }

    // RECORD
    async createRecord(createRecordRequest: CreateRecordRequest) {
        const service = await this.salonRepository.getServiceById(createRecordRequest.serviceId);

        if (!service) {
            throw new NotFoundException();
        }

        const employee = await this.salonRepository.getEmployeeById(createRecordRequest.employeeId);

        if (!employee) {
            throw new NotFoundException();
        }

        return await this.salonRepository.createRecord(createRecordRequest);
    }

    async getRecordById(id: number) {
        const record = await this.salonRepository.getRecordById(id);

        if (!record) {
            throw new NotFoundException();
        }

        return record;
    }

    async updateRecord(updateRecordRequest: UpdateRecordRequest) {
        const record = await this.salonRepository.getRecordById(updateRecordRequest.id);

        if (!record) {
            throw new NotFoundException();
        }

        return await this.salonRepository.updateRecord(updateRecordRequest);
    }

    async deleteRecordById(id: number) {
        const record = await this.salonRepository.getRecordById(id);

        if (!record) {
            throw new NotFoundException();
        }

        return await this.salonRepository.deleteRecordById(id);
    }

    async getRecordsWithPagination(getRecordsPagination: GetRecordsPagination): Promise<IGetRecordsResponse> {
        return await this.salonRepository.getRecordsWithPagination(getRecordsPagination.limit, getRecordsPagination.offset, getRecordsPagination.status);
    }

    async changeRecordStatus(id: number, status: EStatus) {
        const record = await this.salonRepository.getRecordById(id);

        if (!record) {
            throw new NotFoundException();
        }

        return await this.salonRepository.changeRecordStatus(id, status);
    }
}
