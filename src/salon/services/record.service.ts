import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecordRequest } from '../requests/create.record.request';
import { UpdateRecordRequest } from '../requests/update.record.request';
import { GetRecordsPagination } from '../requests/get.records.pagingation';
import { IGetRecordsResponse } from '../responses/get.records.response';
import { EStatus } from '../domain/status.enum';
import { RecordRepository } from '../repositories/record.repository';
import { ServiceRepository } from '../repositories/service.repository';
import { EmployeeRepository } from '../repositories/employee.repository';

@Injectable()
export class RecordService {
    constructor(
        private readonly recordRepository: RecordRepository,
        private readonly serviceRepository: ServiceRepository,
        private readonly employeeRepository: EmployeeRepository,
    ) {}

    async createRecord(createRecordRequest: CreateRecordRequest) {
        const service = await this.serviceRepository.getServiceById(createRecordRequest.serviceId);

        if (!service) {
            throw new NotFoundException();
        }

        const employee = await this.employeeRepository.getEmployeeById(
            createRecordRequest.employeeId,
        );

        if (!employee) {
            throw new NotFoundException();
        }

        return await this.recordRepository.createRecord(createRecordRequest);
    }

    async getRecordById(id: number) {
        const record = await this.recordRepository.getRecordById(id);

        if (!record) {
            throw new NotFoundException();
        }

        return record;
    }

    async updateRecord(updateRecordRequest: UpdateRecordRequest) {
        const record = await this.recordRepository.getRecordById(updateRecordRequest.id);

        if (!record) {
            throw new NotFoundException();
        }

        return await this.recordRepository.updateRecord(updateRecordRequest);
    }

    async deleteRecordById(id: number) {
        const record = await this.recordRepository.getRecordById(id);

        if (!record) {
            throw new NotFoundException();
        }

        return await this.recordRepository.deleteRecordById(id);
    }

    async getRecordsWithPagination(
        getRecordsPagination: GetRecordsPagination,
    ): Promise<IGetRecordsResponse> {
        return await this.recordRepository.getRecordsWithPagination(
            getRecordsPagination.limit,
            getRecordsPagination.offset,
            getRecordsPagination.status,
        );
    }

    async changeRecordStatus(id: number, status: EStatus) {
        const record = await this.recordRepository.getRecordById(id);

        if (!record) {
            throw new NotFoundException();
        }

        return await this.recordRepository.changeRecordStatus(id, status);
    }
}
