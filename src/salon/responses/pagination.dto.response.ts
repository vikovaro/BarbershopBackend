import { IRecordResponse, RecordResponse } from './record.response';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export class GetAllRecordsResponse implements IGetAllRecordsResponse {
    @ApiProperty({ isArray: true, type: () => RecordResponse, nullable: true })
    @Exclude()
    records: RecordResponse[];

    @ApiProperty({ example: 10 })
    @Expose()
    count: number;
}

export interface IGetAllRecordsResponse {
    records: IRecordResponse[];
    count: number;
}