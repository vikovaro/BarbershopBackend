import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, Min, IsOptional, IsInt } from 'class-validator';
import { Expose } from 'class-transformer';

export class UpdateUserRequest {
    @ApiProperty({ example: 1 })
    @IsInt()
    @Min(1)
    @Expose()
    id: number;

    @ApiPropertyOptional({ example: "user@example.com" })
    @IsString()
    @IsOptional()
    @Expose()
    login?: string;

    @ApiPropertyOptional({ example: "password123" })
    @IsString()
    @IsOptional()
    @Min(6)
    @Expose()
    password?: string;

    @ApiPropertyOptional({ example: "+79001234567" })
    @IsString()
    @IsOptional()
    @Expose()
    phone?: string;

    @ApiPropertyOptional({ example: "John Doe" })
    @IsString()
    @IsOptional()
    @Expose()
    full_name?: string;
} 