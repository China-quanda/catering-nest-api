import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class generateCaptchaDto  {

  @ApiProperty({ description: '自定义验证码过期时间', required: false, example: new Date(Date.now() + 5 * 60 * 1000) })
  @IsOptional()
  @IsDateString()
  expiresTime?: Date | string;

  @ApiProperty({ description: '账户', required: false, example: '864910436@qq.com' })
  @IsOptional()
  @IsString()
  @Type(() => String)
  account?: string;
}

export class validateCaptchaDto  {

  @ApiProperty({ description: '验证码', required: true, example: 'HBDS8D' })
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  code: string;

  @ApiProperty({ description: '账户', required: false, example: '864910436@qq.com' })
  @IsOptional()
  @IsString()
  @Type(() => String)
  account?: string;
}
