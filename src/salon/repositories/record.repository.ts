import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateRecordRequest } from '../requests/create.record.request';
import { IRecordResponse } from '../responses/record.response';
import { EStatus } from '../domain/status.enum';
import { IGetRecordsResponse } from '../responses/get.records.response';
import { UpdateRecordRequest } from '../requests/update.record.request';

@Injectable()
export class RecordRepository {
    constructor(private readonly prisma: PrismaClient) {}

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
            },
        });

        return {
            ...record,
            notes: record.notes ?? undefined,
            service: {
                ...record.service,
                price: parseFloat(parseFloat(record.service.price.toString()).toFixed(2)),
            },
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
            },
        });
    }

    async getRecordsWithPagination(
        limit: number,
        offset: number,
        status?: EStatus,
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
            },
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
                clientName: updateRecordRequest.clientName
                    ? updateRecordRequest.clientName
                    : undefined,
                clientPhone: updateRecordRequest.clientPhone
                    ? updateRecordRequest.clientPhone
                    : undefined,
                status: updateRecordRequest.status ? updateRecordRequest.status : undefined,
                employeeId: updateRecordRequest.employeeId
                    ? updateRecordRequest.employeeId
                    : undefined,
                serviceId: updateRecordRequest.serviceId
                    ? updateRecordRequest.serviceId
                    : undefined,
                notes: updateRecordRequest.notes ? updateRecordRequest.notes : undefined,
            },
            include: {
                service: true,
                employee: true,
            },
        });

        return {
            ...record,
            notes: record.notes ?? undefined,
            service: {
                ...record.service,
                price: parseFloat(parseFloat(record.service.price.toString()).toFixed(2)),
            },
        };
    }
}
