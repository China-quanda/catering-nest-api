import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AddressModule } from './modules/address/address.module';
import { CategoryModule } from './modules/category/category.module';
import { ShopModule } from './modules/shop/shop.module';
import { OrderModule } from './modules/order/order.module';
import { ProductModule } from './modules/product/product.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { RoleModule } from './modules/role/role.module';
import { TableModule } from './modules/table/table.module';
import { IntegralModule } from './modules/integral/integral.module';
import { CouponModule } from './modules/coupon/coupon.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from './common/config/config.module';

@Module({
  imports: [
    ConfigModule,
    UserModule,
    AddressModule,
    CategoryModule,
    ShopModule,
    OrderModule,
    ProductModule,
    EmployeeModule,
    RoleModule,
    TableModule,
    IntegralModule,
    CouponModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
