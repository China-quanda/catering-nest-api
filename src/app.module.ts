import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AddressModule } from './address/address.module';
import { CategoryModule } from './category/category.module';
import { ShopModule } from './shop/shop.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { EmployeeModule } from './employee/employee.module';
import { RoleModule } from './role/role.module';

@Module({
  imports: [UserModule, AddressModule, CategoryModule, ShopModule, OrderModule, ProductModule, EmployeeModule, RoleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
