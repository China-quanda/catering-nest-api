import { ApiProperty } from '@nestjs/swagger';
import { Category } from '@prisma/client';
import { BaseEntity } from 'src/common/entity';

export class CategoryEntity extends BaseEntity implements Category {
  @ApiProperty({ description: '名称' })
  name: string;
  @ApiProperty({ description: '商铺id' })
  shopId: number;
}
