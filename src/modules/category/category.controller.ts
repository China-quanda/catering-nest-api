import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, ParseArrayPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { BaseController } from 'src/common/controller';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoryEntity } from './entities/category.entity';
import { DeleteIdsDto } from 'src/common/dto';
@ApiTags('产品类别')
@Controller('category')
export class CategoryController extends BaseController {
  constructor(private readonly categoryService: CategoryService) {
    super();
  }

  @Post()
  @ApiOperation({ summary: '新增' })
  @ApiCreatedResponse({ type: CreateCategoryDto })
  async create(@Body() body: CreateCategoryDto) {
    const result = await this.categoryService.create(body);
    return this.success(result);
  }

  @Get()
  @ApiOperation({ summary: '获取列表' })
  @ApiOkResponse({ type: CategoryEntity, isArray: true })
  async findAll() {
    const result = await this.categoryService.findAll();
    return this.success(result);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取详情' })
  @ApiOkResponse({ type: CategoryEntity })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新' })
  @ApiOkResponse({ type: CategoryEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateCategoryDto,
  ) {
    const result = await this.categoryService.update(id, body);
    return this.success(result);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除数据分类' })
  @ApiOkResponse({ type: CategoryEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.remove(id);
  }

  @Post('deleteMany')
  @ApiOperation({ summary: '批量删除' })
  @ApiBody({
    type: DeleteIdsDto,
  })
  async deleteMany(@Body('ids', ParseArrayPipe) ids: number[]) {
    const result = await this.categoryService.deleteMany(ids);
    return this.success(result);
  }
}
