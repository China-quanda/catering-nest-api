import { PartialType } from '@nestjs/mapped-types';
import { CreateIntegralDto } from './create-integral.dto';

export class UpdateIntegralDto extends PartialType(CreateIntegralDto) {}
