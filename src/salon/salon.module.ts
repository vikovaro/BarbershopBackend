import { Module } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';
import { ServicesService } from './services/services.service';
import { RecordService } from './services/record.service';
import { EmployeeService } from './services/employee.service';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { ServiceController } from './controllers/service.controller';
import { EmployeeController } from './controllers/employee.controller';
import { RecordController } from './controllers/record.controller';
import { UserRepository } from './repositories/user.repository';
import { EmployeeRepository } from './repositories/employee.repository';
import { RecordRepository } from './repositories/record.repository';
import { ServiceRepository } from './repositories/service.repository';

@Module({
    controllers: [UserController, ServiceController, EmployeeController, RecordController],
    providers: [
        UserService,
        EmployeeService,
        RecordService,
        ServicesService,
        PrismaClient,
        UserRepository,
        EmployeeRepository,
        RecordRepository,
        ServiceRepository,
    ],
})
export class SalonModule {}
