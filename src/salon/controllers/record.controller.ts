import {
    Controller,
    Get,
    Body,
    Patch,
    Delete,
    HttpStatus,
    SerializeOptions,
    Query,
    Post,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { RecordResponse } from '../responses/record.response';
import { CreateRecordRequest } from '../requests/create.record.request';
import { GetRecordsResponse } from '../responses/get.records.response';
import { GetRecordsPagination } from '../requests/get.records.pagingation';
import { UpdateRecordRequest } from '../requests/update.record.request';
import { RecordService } from '../services/record.service';

@Controller('salon')
export class RecordController {
    constructor(private readonly recordService: RecordService) {}

    @Post('/record/create')
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
        return await this.recordService.createRecord(createRecordRequest);
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
        const record = await this.recordService.updateRecord(updateRecordRequest);
        return {
            ...record,
            employee: record.employee,
            service: record.service,
        };
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
        return await this.recordService.getRecordById(+id);
    }

    @Get('/record/all')
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'get all records with pagination',
        type: GetRecordsResponse,
    })
    @SerializeOptions({
        strategy: 'exposeAll',
        type: GetRecordsResponse,
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
    })
    async getProducts(@Body() getRecordsPagination: GetRecordsPagination) {
        return await this.recordService.getRecordsWithPagination(getRecordsPagination);
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
        await this.recordService.deleteRecordById(+id);
        return true;
    }
}
