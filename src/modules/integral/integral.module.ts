import { Module } from '@nestjs/common';
import { IntegralService } from './integral.service';
import { IntegralController } from './integral.controller';

@Module({
  controllers: [IntegralController],
  providers: [IntegralService]
})
export class IntegralModule {}
