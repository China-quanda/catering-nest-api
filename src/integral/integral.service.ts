import { Injectable } from '@nestjs/common';
import { CreateIntegralDto } from './dto/create-integral.dto';
import { UpdateIntegralDto } from './dto/update-integral.dto';

@Injectable()
export class IntegralService {
  create(createIntegralDto: CreateIntegralDto) {
    return 'This action adds a new integral';
  }

  findAll() {
    return `This action returns all integral`;
  }

  findOne(id: number) {
    return `This action returns a #${id} integral`;
  }

  update(id: number, updateIntegralDto: UpdateIntegralDto) {
    return `This action updates a #${id} integral`;
  }

  remove(id: number) {
    return `This action removes a #${id} integral`;
  }
}
