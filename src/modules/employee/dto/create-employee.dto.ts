import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateEmployeeDto implements Prisma.EmployeeUncheckedCreateInput {
  @ApiProperty({ description: '员工姓名' })
  @IsString()
  @Type(() => String)
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: '员工姓别 1男 2女' })
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  sex: number;

  @ApiProperty({
    description: '员工手机号码',
    example: 18684868152,
  })
  @IsString()
  @Type(() => String)
  @IsNotEmpty({ message: '手机号码不为空' })
  phone: string;

  @ApiProperty({ description: '员工身份证号码' })
  @IsString()
  @Type(() => String)
  @IsNotEmpty()
  idNumber: string;

  @ApiProperty({ description: '员工密码', example: '12345678' })
  @IsString()
  @Type(() => String)
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: '员工状态 1启用 2禁用', default: 1 })
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  status?: number;

  @ApiProperty({
    description: '员工生日',
    required: false,
    example: new Date(),
  })
  @IsOptional()
  @IsString()
  @Type(() => String)
  birthday?: string | Date;

  @ApiProperty({
    description: '员工婚姻状态 1未婚 2已婚 3离异 4丧偶',
    example: 1,
  })
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  maritalStatus: number;

  @ApiProperty({ description: '员工入职日期', example: new Date() })
  @IsOptional()
  @IsString()
  @Type(() => String)
  entryDate: string | Date;

  @ApiProperty({ description: '员工所属商铺id', required: false })
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  shopId: number;
}
