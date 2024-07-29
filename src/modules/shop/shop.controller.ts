import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  ParseArrayPipe,
} from '@nestjs/common';
import { ShopService } from './shop.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { BaseController } from 'src/common/controller';
import { QueryShopDto } from './dto/query-shop.dto';
import { ShopEntity } from './entities/shop.entity';
import { DeleteIdsDto } from 'src/common/dto';

@ApiTags('商铺管理')
@Controller('shop')
export class ShopController extends BaseController {
  constructor(private readonly shopService: ShopService) {
    super();
  }

  @Post()
  @ApiOperation({ summary: '新增' })
  @ApiCreatedResponse({ type: CreateShopDto })
  async create(@Body() body: CreateShopDto) {
    const result = await this.shopService.create(body);
    return this.success(result);
  }

  @Get()
  @ApiOperation({ summary: '获取列表' })
  @ApiOkResponse({ type: ShopEntity, isArray: true })
  async findAll(@Query() query: QueryShopDto) {
    const result = await this.shopService.findAll(query);
    return this.success(result);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取详情' })
  @ApiOkResponse({ type: ShopEntity })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.shopService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新' })
  @ApiOkResponse({ type: ShopEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateShopDto,
  ) {
    const result = await this.shopService.update(id, body);
    return this.success(result);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除数据分类' })
  @ApiOkResponse({ type: ShopEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.shopService.remove(id);
  }

  @Post('deleteMany')
  @ApiOperation({ summary: '批量删除' })
  @ApiBody({
    type: DeleteIdsDto,
  })
  async deleteMany(@Body('ids', ParseArrayPipe) ids: number[]) {
    const result = await this.shopService.deleteMany(ids);
    return this.success(result);
  }
}
