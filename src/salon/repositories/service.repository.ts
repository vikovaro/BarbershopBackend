import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateServiceRequest } from '../requests/create.service.request';
import { IServiceResponse } from '../responses/service.response';
import { IGetServiceResponse } from '../responses/get.service.response';
import { UpdateServiceRequest } from '../requests/update.service.request';

@Injectable()
export class ServiceRepository {
    constructor(private readonly prisma: PrismaClient) {}

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
}
