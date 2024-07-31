import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseQueryDto } from 'src/common/dto';

export class QueryUserDto extends BaseQueryDto {

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  @ApiProperty({
    description: '状态',
    example: 1,
    required: false,
  })
  status?: number;

  @IsString()
  @Type(() => String)
  @IsOptional()
  @ApiProperty({
    description: '用户名',
    example: '张三',
    required: false,
  })
  name?: string;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  @ApiProperty({
    description: '手机号码',
    example: 18684868152,
    required: false,
  })
  phone?: number;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  @ApiProperty({
    description: '性别 1男 2女',
    example: 1,
    required: false,
  })
  sex?: number;
}
