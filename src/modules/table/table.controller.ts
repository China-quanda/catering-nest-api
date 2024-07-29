import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, ParseArrayPipe } from '@nestjs/common';
import { TableService } from './table.service';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/common/controller';
import { TableEntity } from './entities/table.entity';
import { DeleteIdsDto } from 'src/common/dto';

@ApiTags('餐桌管理')
@Controller('table')
export class TableController extends BaseController {
  constructor(private readonly tableService: TableService) {
    super();
  }

  @Post()
  @ApiOperation({ summary: '新增' })
  @ApiCreatedResponse({ type: CreateTableDto })
  async create(@Body() body: CreateTableDto) {
    const result = await this.tableService.create(body);
    return this.success(result);
  }

  @Get()
  @ApiOperation({ summary: '获取列表' })
  @ApiOkResponse({ type: TableEntity, isArray: true })
  async findAll() {
    const result = await this.tableService.findAll();
    return this.success(result);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取详情' })
  @ApiOkResponse({ type: TableEntity })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tableService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新' })
  @ApiOkResponse({ type: TableEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateTableDto,
  ) {
    const result = await this.tableService.update(id, body);
    return this.success(result);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除数据分类' })
  @ApiOkResponse({ type: TableEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tableService.remove(id);
  }

  @Post('deleteMany')
  @ApiOperation({ summary: '批量删除' })
  @ApiBody({
    type: DeleteIdsDto,
  })
  async deleteMany(@Body('ids', ParseArrayPipe) ids: number[]) {
    const result = await this.tableService.deleteMany(ids);
    return this.success(result);
  }
}
