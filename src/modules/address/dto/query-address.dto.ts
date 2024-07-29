import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
// import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseQueryDto } from 'src/common/dto';

export class QueryAddressDto extends BaseQueryDto {
  // @Transform((value) => (value.value == 'true' ? true : false), {
  //   toClassOnly: true,
  // })
  // // @Type(() => Boolean)
  // @IsBoolean()
  // @IsOptional()
  // @ApiProperty({ description: '状态', default: true, required: false })
  // status?: boolean;

  @IsString()
  @Type(() => String)
  @IsOptional()
  @ApiProperty({
    description: '名称',
    example: '张三',
    required: false,
  })
  name?: string;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  @ApiProperty({ description: '性别 1先生 2女士', example: 1, required: false })
  sex?: number;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  @ApiProperty({ description: '用户id', example: 1, required: false })
  userId?: number;

  @IsString()
  @Type(() => String)
  @IsOptional()
  @ApiProperty({ description: '手机号码', example: '18684868151', required: false })
  phone?: string;

  @IsString()
  @Type(() => String)
  @IsOptional()
  @ApiProperty({ description: '省份名称', example: '湖南省', required: false })
  province?: string;

  @IsString()
  @Type(() => String)
  @IsOptional()
  @ApiProperty({ description: '城市名称', example: '郴州市', required: false })
  city?: string;

  @IsString()
  @Type(() => String)
  @IsOptional()
  @ApiProperty({
    description: '区（县）名称',
    example: '北湖区',
    required: false,
  })
  district?: string;
}
