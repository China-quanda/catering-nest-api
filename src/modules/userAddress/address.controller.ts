import { Controller, Get, Post, Body, Patch, Param, Delete, ParseArrayPipe, ParseIntPipe, Query } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { BaseController } from 'src/common/controller';
import { ApiTags, ApiOperation, ApiCreatedResponse, ApiOkResponse, ApiBody } from '@nestjs/swagger';
import { DeleteIdsDto } from 'src/common/dto';
import { QueryShopDto } from '../shop/dto/query-shop.dto';
import { AddressEntity } from './entities/address.entity';

@ApiTags('用户地址管理')
@Controller('address')
export class AddressController extends BaseController{
  constructor(private readonly addressService: AddressService) {
    super();
  }

  @Post()
  @ApiOperation({ summary: '新增' })
  @ApiCreatedResponse({ type: CreateAddressDto })
  async create(@Body() body: CreateAddressDto) {
    const result = await this.addressService.create(body);
    return this.success(result);
  }

  @Get()
  @ApiOperation({ summary: '获取列表' })
  @ApiOkResponse({ type: AddressEntity, isArray: true })
  async findAll(@Query() query: QueryShopDto) {
    const result = await this.addressService.findAll(query);
    return this.success(result);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取详情' })
  @ApiOkResponse({ type: AddressEntity })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.addressService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新' })
  @ApiOkResponse({ type: AddressEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateAddressDto,
  ) {
    const result = await this.addressService.update(id, body);
    return this.success(result);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除数据分类' })
  @ApiOkResponse({ type: AddressEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.addressService.remove(id);
  }

  @Post('deleteMany')
  @ApiOperation({ summary: '批量删除' })
  @ApiBody({
    type: DeleteIdsDto,
  })
  async deleteMany(@Body('ids', ParseArrayPipe) ids: number[]) {
    const result = await this.addressService.deleteMany(ids);
    return this.success(result);
  }
}
