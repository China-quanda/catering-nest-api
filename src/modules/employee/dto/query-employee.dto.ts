import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseQueryDto } from 'src/common/dto';

export class QueryEmployeeDto extends BaseQueryDto {
  @IsOptional()
  @IsString()
  @Type(() => String)
  @ApiProperty({
    description: '员工姓名',
    example: '张三',
    required: false,
  })
  name?: string;

  @ApiProperty({ description: '员工姓别 1男 2女', example: 1, required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  sex?: number;

  @ApiProperty({
    description: '员工手机号码',
    example: 18684868152,
    required: false,
  })
  @IsOptional()
  @IsString()
  @Type(() => String)
  phone?: string;

  @ApiProperty({ description: '员工身份证号码', required: false })
  @IsOptional()
  @IsString()
  @Type(() => String)
  idNumber?: string;

  @ApiProperty({
    description: '员工状态 1启用 2禁用',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  status?: number;

  // @ApiProperty({
  //   description: '员工所属商铺id',
  //   example: 1,
  //   required: false,
  // })
  // @IsNumber()
  // @Type(() => Number)
  // shopId?: number;
}
