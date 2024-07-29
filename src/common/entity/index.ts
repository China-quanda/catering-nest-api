import { ApiProperty } from '@nestjs/swagger';
export class BaseEntity {
  @ApiProperty({ description: 'id' })
  id: number;
  @ApiProperty({ description: '创建时间' })
  createTime: Date;
  @ApiProperty({ description: '更新时间' })
  updateTime: Date;
}
