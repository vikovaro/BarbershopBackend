import { Module } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';
import { ServicesService } from './services/services.service';
import { RecordService } from './services/record.service';
import { EmployeeService } from './services/employee.service';
import { ServiceController } from './controllers/service.controller';
import { EmployeeController } from './controllers/employee.controller';
import { RecordController } from './controllers/record.controller';
import { EmployeeRepository } from './repositories/employee.repository';
import { RecordRepository } from './repositories/record.repository';
import { ServiceRepository } from './repositories/service.repository';

@Module({
    controllers: [ServiceController, EmployeeController, RecordController],
    providers: [
        EmployeeService,
        RecordService,
        ServicesService,
        PrismaClient,
        EmployeeRepository,
        RecordRepository,
        ServiceRepository,
    ],
})
export class SalonModule {}
