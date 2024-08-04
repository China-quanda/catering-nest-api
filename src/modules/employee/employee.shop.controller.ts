import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseArrayPipe,
  ParseIntPipe,
  Query,
  Req,
} from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { ShopEmployeeService } from './employee.shop.service';
import { EmployeeEntity } from './entities/employee.entity';
import { BaseController } from 'src/common/controller';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBody,
} from '@nestjs/swagger';
import { DeleteIdsDto } from 'src/common/dto';
import { QueryEmployeeDto } from './dto/query-employee.dto';
import { LoginEmployeeDto } from './dto/login-employee.dto';
import { SignInEntity } from '../auth/entities/signIn.entity';

@ApiTags('商铺管理/员工管理')
@Controller('shop/employee')
export class ShopEmployeeController extends BaseController {
  constructor(private readonly employeeService: ShopEmployeeService) {
    super();
  }
  @Post()
  @ApiOperation({ summary: '新增' })
  @ApiCreatedResponse({ type: EmployeeEntity })
  async create(@Body() body: CreateEmployeeDto) {
    const result = await this.employeeService.create(body);
    return this.success(result);
  }

  @Get('list')
  @ApiOperation({ summary: '获取列表' })
  @ApiOkResponse({ type: EmployeeEntity, isArray: true })
  async findAll(@Query() query: QueryEmployeeDto) {
    console.log('QueryEmployeeDto', query);
    const result = await this.employeeService.findAll(query);
    return this.success(result);
  }

  @Get('/getInfo')
  @ApiOperation({ summary: '获取员工详情' })
  // @ApiOkResponse({ type: { EmployeeEntity } })
  getInfo(@Req() req: Request) {
    console.log('req', req);
    const id = 1;
    return this.employeeService.getInfo(id);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取详情' })
  @ApiOkResponse({ type: EmployeeEntity })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.employeeService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新' })
  @ApiOkResponse({ type: EmployeeEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateEmployeeDto,
  ) {
    const result = await this.employeeService.update(id, body);
    return this.success(result);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除数据分类' })
  @ApiOkResponse({ type: EmployeeEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.employeeService.remove(id);
  }

  @Post('deleteMany')
  @ApiOperation({ summary: '批量删除' })
  @ApiBody({
    type: DeleteIdsDto,
  })
  async deleteMany(@Body('ids', ParseArrayPipe) ids: number[]) {
    const result = await this.employeeService.deleteMany(ids);
    return this.success(result);
  }

  @Post('login')
  @ApiOperation({ summary: '员工登录' })
  @ApiCreatedResponse({ type: SignInEntity })
  async login(@Body() body: LoginEmployeeDto) {
    const result = await this.employeeService.login(body);
    return this.success(result);
  }
}
