import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceRequest } from '../requests/create.service.request';
import { UpdateServiceRequest } from '../requests/update.service.request';
import { IGetServiceResponse } from '../responses/get.service.response';
import { ServiceRepository } from '../repositories/service.repository';

@Injectable()
export class ServicesService {
    constructor(private readonly serviceRepository: ServiceRepository) {}

    async createService(createServiceRequest: CreateServiceRequest) {
        return await this.serviceRepository.createService(createServiceRequest);
    }

    async getServiceById(id: number) {
        const service = await this.serviceRepository.getServiceById(id);

        if (!service) {
            throw new NotFoundException();
        }

        return service;
    }

    async deleteServiceById(id: number) {
        const service = await this.serviceRepository.getServiceById(id);

        if (!service) {
            throw new NotFoundException();
        }

        return await this.serviceRepository.deleteServiceById(id);
    }

    async updateService(updateServiceRequest: UpdateServiceRequest) {
        const service = await this.serviceRepository.getServiceById(updateServiceRequest.id);

        if (!service) {
            throw new NotFoundException();
        }

        return await this.serviceRepository.updateService(updateServiceRequest);
    }

    async getServicesWithPagination(limit: number, offset: number): Promise<IGetServiceResponse> {
        return await this.serviceRepository.getServicesWithPagination(limit, offset);
    }
}
