import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { BaseEntity } from 'src/common/entity';

export class UserEntity extends BaseEntity implements User {

  @ApiProperty({ description: '手机号' })
  phone: bigint;

  @ApiProperty({ description: '用户名称' })
  name: string;

  @ApiProperty({ description: '头像' })
  avatar: string;

  @ApiProperty({ description: '性别 1男 2女' })
  sex: number;

  @ApiProperty({ description: '生日' })
  birthday: Date;

  @ApiProperty({ description: '密码' })
  password: string;

  @ApiProperty({ description: '微信小程序openid' })
  openId: string;

  @ApiProperty({ description: '状态 1启用 2禁用' })
  status: number;
}
