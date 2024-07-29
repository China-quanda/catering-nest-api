import { ApiProperty } from '@nestjs/swagger';
import { Shop } from '@prisma/client';
import { BaseEntity } from 'src/common/entity';

export class ShopEntity extends BaseEntity implements Shop {
  @ApiProperty({ description: '商铺编号' })
  no: number;
  @ApiProperty({ description: '商铺logo' })
  logo: string;
  @ApiProperty({ description: '纬度，浮点数，范围为-90~90，负数表示南纬' })
  latitude: string;
  @ApiProperty({ description: '经度，浮点数，范围为-180~180，负数表示西经' })
  longitude: string;
  @ApiProperty({ description: '国家' })
  country: string;
  @ApiProperty({ description: '省份名称' })
  province: string;
  @ApiProperty({ description: '城市名称' })
  city: string;
  @ApiProperty({ description: '区（县）名称' })
  district: string;
  @ApiProperty({ description: '街道信息' })
  street: string;
  @ApiProperty({ description: '获取街道门牌号信息' })
  streetNum: string;
  @ApiProperty({ description: '城市代码' })
  cityCode: string;
}
