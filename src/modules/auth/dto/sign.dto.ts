import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    description: '手机号码',
    example: '18684868152',
  })
  @IsString()
  @IsNotEmpty({ message: '手机号码不为空' })
  phone: string;

  @ApiProperty({
    description: '密码',
    example: '12345678',
  })
  @IsString()
  @Length(8, 30, { message: 'password的长度不能小于8不能大于30个字符' })
  @IsNotEmpty({ message: '密码不为空' })
  password: string;
}
