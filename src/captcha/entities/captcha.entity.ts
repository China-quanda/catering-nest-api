import { ApiProperty } from "@nestjs/swagger";
import { Captcha } from "@prisma/client";
import { BaseEntity } from "src/common/entity";

export class CaptchaEntity extends BaseEntity implements Captcha {
  @ApiProperty({ description: '账户' })
  account: string;
  @ApiProperty({ description: '验证码' })
  code: string;
  @ApiProperty({ description: '过期时间' })
  expiresTime: Date;
  @ApiProperty({ description: '是否使用 0未使用 1已使用' })
  used: number;
}