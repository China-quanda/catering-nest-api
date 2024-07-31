import { ApiProperty } from '@nestjs/swagger';
import { UserAddress } from '@prisma/client';
import { BaseEntity } from 'src/common/entity';

export class AddressEntity extends BaseEntity implements UserAddress {
  @ApiProperty({ description: '手机号码' })
  phone: string;
  @ApiProperty({ description: '名称' })
  name: string;
  @ApiProperty({ description: '性别 1先生 2女士' })
  sex: number;
  @ApiProperty({ description: '用户id' })
  userId: number;
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
  @ApiProperty({ description: '是否默认地址' })
  isDefault: boolean;
}
