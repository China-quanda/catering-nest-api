import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseArrayPipe,
  // UseGuards,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { QueryUserDto } from './dto/query-user.dto';
import { DeleteIdsDto } from 'src/common/dto';
import { BaseController } from 'src/common/controller';
// import { JwtAuthGuard } from 'apps/admin/src/auth/jwt-auth.guard';

@ApiTags('用户管理')
@Controller('/user')
export class UserController extends BaseController {
  constructor(private readonly userService: UserService) {
    super();
  }

  @Post()
  @ApiOperation({ summary: '新增用户' })
  @ApiCreatedResponse({ type: UserEntity })
  async create(@Body() createUserDto: CreateUserDto) {
    const result = await this.userService.create(createUserDto);
    return this.success(result);
  }
  // @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: '获取用户列表' })
  @ApiOkResponse({ type: UserEntity, isArray: true })
  async findAll(@Query() query: QueryUserDto) {
    const result = await this.userService.findAll(query);
    return this.success(result);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取用户详情' })
  @ApiOkResponse({ type: UserEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const result = await this.userService.findOne(id);
    return this.success(result);
  }

  @Patch(':id')
  @ApiOperation({ summary: '修改用户' })
  @ApiOkResponse({ type: UserEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const result = await this.userService.update(id, updateUserDto);
    return this.success(result);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除用户' })
  @ApiOkResponse({ type: UserEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    const result = await this.userService.remove(id);
    return this.success(result);
  }

  @Post('deleteMany')
  @ApiOperation({ summary: '批量删除' })
  @ApiBody({
    type: DeleteIdsDto,
  })
  async deleteMany(@Body('ids', ParseArrayPipe) ids: number[]) {
    const result = await this.userService.deleteMany(ids);
    return this.success(result);
  }
}
