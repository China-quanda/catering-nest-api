import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTableDto implements Prisma.TableUncheckedCreateInput {

  @ApiProperty({
    description: '名称',
    required: true,
    example: '',
  })
  @IsString()
  @Type(() => String)
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: '编号' })
  @IsString()
  @Type(() => String)
  @IsNotEmpty()
  no: string;

  @ApiProperty({ description: '二维码',required: true })
  @IsString()
  @Type(() => String)
  @IsNotEmpty()
  qrCode: string;

  @ApiProperty({ description: '商铺id', required: true, example: 10000 })
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  shopId: number;
}
