import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeRequest } from '../requests/create.employee.request';
import { IEmployeeResponse } from '../responses/employee.response';
import { IGetEmployeesResponse } from '../responses/get.employee.response';
import { UpdateEmployeeRequest } from '../requests/update.employee.request';
import { EmployeeRepository } from '../repositories/employee.repository';
import { AppException } from '../errors/app-exception';

@Injectable()
export class EmployeeService {
    constructor(private readonly employeeRepository: EmployeeRepository) {}

    async createEmployee(createEmployeeRequest: CreateEmployeeRequest): Promise<IEmployeeResponse> {
        const employee = await this.employeeRepository.getEmployeeByLogin(
            createEmployeeRequest.login,
        );
        if (employee) {
            throw new AppException('Login already exists');
        }

        return await this.employeeRepository.createEmployee(createEmployeeRequest);
    }

    async getEmployeeById(id: number) {
        const employee = await this.employeeRepository.getEmployeeById(id);

        if (!employee) {
            throw new NotFoundException();
        }

        return employee;
    }

    async getEmployeesWithPagination(
        limit: number,
        offset: number,
    ): Promise<IGetEmployeesResponse> {
        return await this.employeeRepository.getEmployeesWithPagination(limit, offset);
    }

    async updateEmployee(updateEmployeeRequest: UpdateEmployeeRequest) {
        const employee = await this.employeeRepository.getEmployeeById(updateEmployeeRequest.id);

        if (!employee) {
            throw new NotFoundException();
        }

        return await this.employeeRepository.updateEmployee(updateEmployeeRequest);
    }

    async deleteEmployeeById(id: number) {
        const employee = await this.employeeRepository.getEmployeeById(id);

        if (!employee) {
            throw new NotFoundException();
        }

        return await this.employeeRepository.deleteEmployeeById(id);
    }
}
