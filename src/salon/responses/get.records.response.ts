import { IRecordResponse, RecordResponse } from './record.response';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export class GetRecordsResponse implements IGetRecordsResponse {
    @ApiProperty({ isArray: true, type: () => RecordResponse, nullable: true })
    @Exclude()
    records: RecordResponse[];

    @ApiProperty({ example: 10 })
    @Expose()
    count: number;
}

export interface IGetRecordsResponse {
    records: IRecordResponse[];
    count: number;
}