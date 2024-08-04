import { BaseEntity } from 'src/common/entity';
import { Employee } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class EmployeeEntity extends BaseEntity implements Employee {
  @ApiProperty({ description: '员工姓名' })
  name: string;

  @ApiProperty({ description: '员工姓别 1男 2女' })
  sex: number;

  @ApiProperty({ description: '员工手机号码' })
  phone: string;

  @ApiProperty({ description: '员工身份证号码' })
  idNumber: string;

  @ApiProperty({ description: '员工密码' })
  password: string;

  @ApiProperty({ description: '员工状态 1启用 2禁用' })
  status: number;

  @ApiProperty({ description: '员工生日' })
  birthday: Date;

  @ApiProperty({ description: '员工婚姻状态 1未婚 2已婚 3离异 4丧偶' })
  maritalStatus: number;

  @ApiProperty({ description: '员工入职日期' })
  entryDate: Date;

  @ApiProperty({ description: '员工所属商铺id' })
  shopId: number;
}
