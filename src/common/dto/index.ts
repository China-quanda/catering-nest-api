import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  Min,
} from 'class-validator';
export class BaseQueryDto {
  @Min(1)
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  @ApiProperty({ description: '页码', default: 1 })
  pageNum?: number;

  @Min(1)
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  @ApiProperty({ description: '每页条数', default: 10 })
  pageSize?: number;
}

export class DeleteIdsDto {
  @IsNotEmpty()
  @IsArray()
  @ApiProperty({
    description: '删除列表',
    required: true,
    example: [1, 2, 3, 4, 5],
  })
  ids: number[];
}

/**
 * 时间区间对象
 */
export class DateParamsDTO {
  @IsDateString()
  beginTime: string;

  @IsDateString()
  endTime: string;
}
