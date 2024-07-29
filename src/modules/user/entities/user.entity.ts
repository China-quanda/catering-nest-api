import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { BaseEntity } from 'src/common/entity';

export class UserEntity extends BaseEntity implements User {
  @ApiProperty({ description: 'id' })
  id: number;

  @ApiProperty({ description: '创建时间' })
  createTime: Date;

  @ApiProperty({ description: '更新时间' })
  updateTime: Date;

  @ApiProperty({ description: '手机号' })
  phone: string;

  @ApiProperty({ description: '名称' })
  name: string;

  @ApiProperty({ description: '生日' })
  birthday: Date;

  @ApiProperty({ description: '性别 1男 2女' })
  sex: number;

  @ApiProperty({ description: '密码' })
  password: string;

  @ApiProperty({ description: '头像' })
  avatar: string;

  @ApiProperty({ description: '状态' })
  status: boolean;
}
