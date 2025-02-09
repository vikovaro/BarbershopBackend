import { IRecordResponse, RecordResponse } from './record.response';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export class GetRecordsResponse implements IGetRecordsResponse {
    @ApiProperty({ example: 10 })
    @Expose()
    count: number;

    @ApiProperty({ isArray: true, type: () => RecordResponse, nullable: true })
    @Exclude()
    records: RecordResponse[];
}

export interface IGetRecordsResponse {
    records: IRecordResponse[];
    count: number;
}