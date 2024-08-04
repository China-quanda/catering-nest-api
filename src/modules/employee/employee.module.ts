import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { ShopEmployeeController } from './employee.shop.controller';
import { ShopEmployeeService } from './employee.shop.service';
import { CaptchaService } from 'src/captcha/captcha.service';
import { JwtService } from '@nestjs/jwt';
import { ShopService } from '../shop/shop.service';

@Module({
  controllers: [EmployeeController, ShopEmployeeController],
  providers: [
    EmployeeService,
    ShopEmployeeService,
    CaptchaService,
    JwtService,
    ShopService,
  ],
})
export class EmployeeModule {}
