// import { PartialType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger';
import { CreateIntegralDto } from './create-integral.dto';

export class UpdateIntegralDto extends PartialType(CreateIntegralDto) {}
