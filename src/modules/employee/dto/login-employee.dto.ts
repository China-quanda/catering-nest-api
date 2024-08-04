import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginEmployeeDto {

  @ApiProperty({
    description: '手机号码',
    example: 18684868152,
  })
  @IsString()
  @Type(() => String)
  phone: string;

  @ApiProperty({ description: '密码', example: '12345678' })
  @IsString()
  @Type(() => String)
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: '验证码', example: '3425' })
  @IsString()
  @Type(() => String)
  @IsNotEmpty()
  code: string;
}
