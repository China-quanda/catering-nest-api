import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
// import { Transform, Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseQueryDto } from 'src/common/dto';

export class QueryShopDto extends BaseQueryDto {
  // @Transform((value) => (value.value == 'true' ? true : false), {
  //   toClassOnly: true,
  // })
  // // @Type(() => Boolean)
  // @IsBoolean()
  // @IsOptional()
  // @ApiProperty({ description: '状态', default: true, required: false })
  // status?: boolean;

  // @IsString()
  // @Type(() => String)
  // @IsOptional()
  // @ApiProperty({
  //   description: '分类名称',
  //   example: '二级考试',
  //   required: false,
  // })
  // name?: string;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  @ApiProperty({ description: '商铺编号', example: '10000', required: false })
  no?: number;

  @IsString()
  @Type(() => String)
  @IsOptional()
  @ApiProperty({ description: '国家', example: '中国', required: false })
  country?: string;

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
