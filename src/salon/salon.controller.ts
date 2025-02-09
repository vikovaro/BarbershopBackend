import {
    Controller,
    Get,
    Body,
    Patch,
    Delete,
    Put,
    HttpStatus,
    SerializeOptions,
    Query,
} from '@nestjs/common';
import { SalonService } from './salon.service';
import { ApiResponse } from '@nestjs/swagger';
import { EmployeeResponse } from './responses/employee.response';
import { CreateEmployeeRequest } from './requests/create.employee.request';
import { ServiceResponse } from './responses/service.response';
import { CreateServiceRequest } from './requests/create.service.request';
import { UpdateServiceRequest } from './requests/update.service.request';
import { UpdateEmployeeRequest } from './requests/update.employee.request';
import { RecordResponse } from './responses/record.response';
import { CreateRecordRequest } from './requests/create.record.request';
import { GetAllRecordsResponse } from './responses/pagination.dto.response';
import { GetRecordsPagination } from './requests/get.records.pagingation';
import { UpdateRecordRequest } from './requests/update.record.request';

@Controller('salon')
export class SalonController {
    constructor(private readonly salonService: SalonService) {
    }

    // EMPLOYEE
    @Put('/employee/create')
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'create employee',
        type: EmployeeResponse,
    })
    @SerializeOptions({
        strategy: 'exposeAll',
        type: EmployeeResponse,
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
    })
    async createEmployee(@Body() createEmployeeRequest: CreateEmployeeRequest): Promise<EmployeeResponse> {
        return await this.salonService.createEmployee(createEmployeeRequest);
    }

    @Patch('/employee/update')
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'update employee',
        type: EmployeeResponse,
    })
    @SerializeOptions({
        strategy: 'exposeAll',
        type: EmployeeResponse,
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
    })
    async updateEmployee(@Body() updateEmployeeRequest: UpdateEmployeeRequest): Promise<EmployeeResponse> {
        return await this.salonService.updateEmployee(updateEmployeeRequest);
    }

    @Get('/employee/get')
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'get employee',
        type: EmployeeResponse,
    })
    @SerializeOptions({
        strategy: 'exposeAll',
        type: EmployeeResponse,
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
    })
    async getEmployee(@Query('id') id: number) {
        return await this.salonService.getEmployeeById(+id);
    }

    @Delete('/employee/delete')
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'delete employee',
        type: Boolean,
    })
    @SerializeOptions({
        strategy: 'exposeAll',
        type: Boolean,
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
    })
    async deleteEmployee(@Query('id') id: number) {
        return await this.salonService.deleteEmployeeById(+id);
    }

    // SERVICE
    @Put('/service/create')
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
    async createService(@Body() createServiceRequest: CreateServiceRequest): Promise<ServiceResponse> {
        return await this.salonService.createService(createServiceRequest);
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
    async updateService(@Body() updateServiceRequest: UpdateServiceRequest): Promise<ServiceResponse> {
        return await this.salonService.updateService(updateServiceRequest);
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
        return await this.salonService.getServiceById(+id);
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
        return await this.salonService.deleteServiceById(+id);
    }

    //RECORD
    @Put('/record/create')
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'create record',
        type: RecordResponse,
    })
    @SerializeOptions({
        strategy: 'exposeAll',
        type: RecordResponse,
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
    })
    async createRecord(@Body() createRecordRequest: CreateRecordRequest): Promise<RecordResponse> {
        return await this.salonService.createRecord(createRecordRequest);
    }

    @Patch('/record/update')
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'update record',
        type: RecordResponse,
    })
    @SerializeOptions({
        strategy: 'exposeAll',
        type: RecordResponse,
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
    })
    async updateRecord(@Body() updateRecordRequest: UpdateRecordRequest): Promise<RecordResponse> {
        return await this.salonService.updateRecord(updateRecordRequest);
    }

    @Get('/record/get')
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'get record',
        type: RecordResponse,
    })
    @SerializeOptions({
        strategy: 'exposeAll',
        type: RecordResponse,
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
    })
    async getRecord(@Query('id') id: number) {
        return await this.salonService.getRecordById(+id);
    }

    @Get('/record/all')
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'get all records with pagination',
        type: GetAllRecordsResponse,
    })
    @SerializeOptions({
        strategy: 'exposeAll',
        type: GetAllRecordsResponse,
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
    })
    async getProducts(@Body() getRecordsPagination: GetRecordsPagination) {
        return await this.salonService.getRecordsWithPagination(getRecordsPagination);
    }

    @Delete('/record/delete')
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'delete record',
        type: Boolean,
    })
    @SerializeOptions({
        strategy: 'exposeAll',
        type: Boolean,
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
    })
    async deleteRecord(@Query('id') id: number) {
        return await this.salonService.deleteRecordById(+id);
    }
}
