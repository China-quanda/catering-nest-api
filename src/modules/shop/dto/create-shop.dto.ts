import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateShopDto implements Prisma.ShopUncheckedCreateInput {
  @ApiProperty({ description: '商铺编号', required: true, example: 10000 })
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty({ message: '商铺编号能为空' })
  no: number;

  @ApiProperty({ description: '商铺logo' })
  @IsString()
  @Type(() => String)
  @IsNotEmpty()
  logo: string;

  @ApiProperty({
    description: '纬度，浮点数，范围为-90~90，负数表示南纬',
    required: true,
    example: '',
  })
  @IsString()
  @Type(() => String)
  @IsNotEmpty()
  latitude: string;

  @ApiProperty({
    description: '经度，浮点数，范围为-180~180，负数表示西经',
    required: true,
    example: '',
  })
  @IsString()
  @Type(() => String)
  @IsNotEmpty()
  longitude: string;

  @ApiProperty({ description: '国家', required: false, example: '中国' })
  @IsOptional()
  @IsString()
  @Type(() => String)
  country?: string;

  @ApiProperty({ description: '省份名称', required: true, example: '湖南省' })
  @IsString()
  @Type(() => String)
  @IsNotEmpty()
  province: string;

  @ApiProperty({ description: '城市名称', required: true, example: '郴州市' })
  @IsString()
  @Type(() => String)
  @IsNotEmpty()
  city: string;

  @ApiProperty({
    description: '区（县）名称',
    required: true,
    example: '北湖区',
  })
  @IsString()
  @Type(() => String)
  @IsNotEmpty()
  district: string;

  @ApiProperty({ description: '街道信息', required: true, example: '燕泉街道' })
  @IsString()
  @Type(() => String)
  @IsNotEmpty()
  street: string;

  @ApiProperty({
    description: '获取街道门牌号信息',
    required: true,
    example: '275号',
  })
  @IsString()
  @Type(() => String)
  @IsNotEmpty()
  streetNum: string;

  @ApiProperty({ description: '城市代码', required: true, example: '431024' })
  @IsString()
  @Type(() => String)
  @IsNotEmpty()
  cityCode: string;
  // employees?: Prisma.EmployeeUncheckedCreateNestedManyWithoutShopInput;
  // tables?: Prisma.TableUncheckedCreateNestedManyWithoutShopInput;
  // categorys?: Prisma.CategoryUncheckedCreateNestedManyWithoutShopInput;

  // @IsOptional()
  // @IsBoolean()
  // @ApiProperty({
  //   description: '状态',
  //   default: true,
  //   required: false,
  // })
  // status?: boolean;

  // @Type(() => String)
  // @IsString()
  // @IsOptional()
  // @ApiProperty({
  //   description: '备注',
  //   default: 0,
  //   required: false,
  // })
  // remark?: string;
}
