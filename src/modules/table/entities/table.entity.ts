import { ApiProperty } from '@nestjs/swagger';
import { Table } from '@prisma/client';
import { BaseEntity } from 'src/common/entity';

export class TableEntity extends BaseEntity implements Table {
  @ApiProperty({ description: '名称' })
  name: string;
  @ApiProperty({ description: '编号' })
  no: string;
  @ApiProperty({ description: '二维码' })
  qrCode: string;
  @ApiProperty({ description: '商铺id' })
  shopId: number;
}
