import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseQueryDto } from 'src/common/dto';

export class QueryUserDto extends BaseQueryDto {
  @Transform((value) => (value.value == 'true' ? true : false), {
    toClassOnly: true,
  })
  // @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  @ApiProperty({ description: '状态', default: true, required: false })
  status?: boolean;

  @IsString()
  @Type(() => String)
  @IsOptional()
  @ApiProperty({
    description: '用户名',
    example: '张三',
    required: false,
  })
  name?: string;

  @IsString()
  @Type(() => String)
  @IsOptional()
  @ApiProperty({
    description: '手机号码',
    example: '18684868152',
    required: false,
  })
  phone?: string;

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
