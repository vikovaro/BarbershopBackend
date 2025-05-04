import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Patch, Post,
    Query,
    SerializeOptions,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { EmployeeResponse } from '../responses/employee.response';
import { CreateEmployeeRequest } from '../requests/create.employee.request';
import { UpdateEmployeeRequest } from '../requests/update.employee.request';
import { GetEmployeesResponse } from '../responses/get.employee.response';
import { GetPaginationRequest } from '../requests/get.pagination';
import { EmployeeService } from '../services/employee.service';

@Controller('salon')
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) {}

    @Post('/employee/create')
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
    async createEmployee(
        @Body() createEmployeeRequest: CreateEmployeeRequest,
    ): Promise<EmployeeResponse> {
        return await this.employeeService.createEmployee(createEmployeeRequest);
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
    async updateEmployee(
        @Body() updateEmployeeRequest: UpdateEmployeeRequest,
    ): Promise<EmployeeResponse> {
        return await this.employeeService.updateEmployee(updateEmployeeRequest);
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
        return await this.employeeService.getEmployeeById(+id);
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
        await this.employeeService.deleteEmployeeById(+id);
        return true;
    }

    @Get('/employee/all')
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'get all employees with pagination',
        type: GetEmployeesResponse,
    })
    @SerializeOptions({
        strategy: 'exposeAll',
        type: GetEmployeesResponse,
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
    })
    async getEmployees(@Body() getPaginationRequest: GetPaginationRequest) {
        return await this.employeeService.getEmployeesWithPagination(
            getPaginationRequest.limit,
            getPaginationRequest.offset,
        );
    }
}
