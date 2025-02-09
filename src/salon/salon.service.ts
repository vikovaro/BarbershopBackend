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


@Injectable()
export class SalonService {
    constructor(private readonly salonRepository: SalonRepository) {}

    async createEmployee(createEmployeeRequest: CreateEmployeeRequest): Promise<IEmployeeResponse> {
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

        await this.salonRepository.deleteEmployeeById(id);
        return true;
    }

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

        await this.salonRepository.deleteServiceById(id);
        return true;
    }

    async updateService(updateServiceRequest: UpdateServiceRequest) {
        const service = await this.salonRepository.getServiceById(updateServiceRequest.id);

        if (!service) {
            throw new NotFoundException();
        }

        return await this.salonRepository.updateService(updateServiceRequest);
    }

    async getRecordById(id: number) {
        const record = await this.salonRepository.getRecordById(id);

        if (!record) {
            throw new NotFoundException();
        }

        return record;
    }

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

    async deleteRecordById(id: number) {
        const record = await this.salonRepository.getRecordById(id);

        if (!record) {
            throw new NotFoundException();
        }

        await this.salonRepository.deleteRecordById(id);
        return true;
    }

    async updateRecord(updateRecordRequest: UpdateRecordRequest) {
        const record = await this.salonRepository.getRecordById(updateRecordRequest.id);

        if (!record) {
            throw new NotFoundException();
        }

        return await this.salonRepository.updateRecord(updateRecordRequest);
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
