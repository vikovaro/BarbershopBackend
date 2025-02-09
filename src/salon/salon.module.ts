import { Module } from '@nestjs/common';
import { SalonService } from './salon.service';
import { SalonController } from './salon.controller';
import { SalonRepository } from './salon.repository';
import { PrismaClient } from '@prisma/client';

@Module({
    controllers: [SalonController],
    providers: [SalonService, PrismaClient, SalonRepository],
})
export class SalonModule {
}
