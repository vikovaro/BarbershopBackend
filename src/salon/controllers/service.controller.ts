import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Patch,
    Post,
    Query,
    SerializeOptions,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ServiceResponse } from '../responses/service.response';
import { CreateServiceRequest } from '../requests/create.service.request';
import { UpdateServiceRequest } from '../requests/update.service.request';
import { GetServiceResponse } from '../responses/get.service.response';
import { GetPaginationRequest } from '../requests/get.pagination';
import { ServicesService } from '../services/services.service';

@Controller('salon')
export class ServiceController {
    constructor(private readonly servicesService: ServicesService) {}

    @Post('/service/create')
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'create service',
        type: ServiceResponse,
    })
    @SerializeOptions({
        strategy: 'exposeAll',
        type: ServiceResponse,
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
    })
    async createService(
        @Body() createServiceRequest: CreateServiceRequest,
    ): Promise<ServiceResponse> {
        return await this.servicesService.createService(createServiceRequest);
    }

    @Patch('/service/update')
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'update service',
        type: ServiceResponse,
    })
    @SerializeOptions({
        strategy: 'exposeAll',
        type: ServiceResponse,
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
    })
    async updateService(
        @Body() updateServiceRequest: UpdateServiceRequest,
    ): Promise<ServiceResponse> {
        return await this.servicesService.updateService(updateServiceRequest);
    }

    @Get('/service/get')
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'get service',
        type: ServiceResponse,
    })
    @SerializeOptions({
        strategy: 'exposeAll',
        type: ServiceResponse,
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
    })
    async getService(@Query('id') id: number) {
        return await this.servicesService.getServiceById(+id);
    }

    @Delete('/service/delete')
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'delete service',
        type: Boolean,
    })
    @SerializeOptions({
        strategy: 'exposeAll',
        type: Boolean,
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
    })
    async deleteService(@Query('id') id: number) {
        await this.servicesService.deleteServiceById(+id);
        return true;
    }

    @Get('/service/all')
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'get all services with pagination',
        type: GetServiceResponse,
    })
    @SerializeOptions({
        strategy: 'exposeAll',
        type: GetServiceResponse,
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
    })
    async getServices(@Body() getPaginationRequest: GetPaginationRequest) {
        return await this.servicesService.getServicesWithPagination(
            getPaginationRequest.limit,
            getPaginationRequest.offset,
        );
    }
}
