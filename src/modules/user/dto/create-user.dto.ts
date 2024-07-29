import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateUserDto implements Prisma.UserCreateInput {
  @ApiProperty({
    description: '手机号码',
    required: true,
    example: '18684868152',
  })
  // @Type(() => String)
  // @IsString()
  @Length(11, 11, { message: '手机号码错误' })
  @IsNotEmpty({ message: '手机号码不为空' })
  phone: string;

  @ApiProperty({ description: '性别 1男 2女', required: true, example: 1 })
  @IsString()
  @Type(() => Number)
  @IsNotEmpty({ message: '性别不能为空' })
  sex: number;

  @ApiProperty({ description: '用户名', required: false, example: '张三' })
  @IsOptional()
  @IsString()
  @Type(() => String)
  name?: string;

  @ApiProperty({ description: '生日', required: false, example: '2024-07-23' })
  @IsOptional()
  @IsString()
  @Type(() => String)
  birthday?: string | Date;

  @ApiProperty({
    description: '密码',
    required: true,
    example: '12345678',
  })
  @IsString()
  @Type(() => String)
  @Length(8, 30, { message: 'password的长度不能小于8不能大于30个字符' })
  @IsNotEmpty({ message: '密码不为空' })
  password: string;

  @ApiProperty({ description: '头像', required: false })
  @IsString()
  @IsOptional()
  avatar?: string;

  @ApiProperty({ description: '状态', required: false, default: true })
  @IsBoolean()
  @IsOptional()
  status?: boolean;

  // @ApiProperty({
  //   description: '地址',
  //   required: false,
  // })
  // @IsOptional()
  // addresss?: Prisma.AddressCreateNestedManyWithoutUserInput;
}
