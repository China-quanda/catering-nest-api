import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { ResultList } from 'src/utils/result';
import { QueryUserDto } from './dto/query-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt();
    createUserDto.password = await bcrypt.hash(createUserDto.password, salt);

    const user = await this.prisma.user.create({
      data: createUserDto,
    });

    return user;
  }

  async findAll(query: QueryUserDto): Promise<ResultList<User[]>> {
    query = Object.assign(
      {
        ...query,
        pageNum: 1,
        pageSize: 10,
      },
      query,
    );
    const where: Prisma.UserWhereInput = {
      AND: [
        {
          name: {
            contains: query.name,
          },
        },
        {
          status: {
            equals: query.status,
          },
        },
        {
          phone: {
            equals: query.phone,
          },
        },
        {
          sex: {
            equals: query.sex,
          },
        },
      ],
    };
    const result = await this.prisma.user.findMany({
      where,
      take: query.pageSize,
      skip: (query.pageNum - 1) * query.pageSize,
    });
    const total = await this.prisma.user.count({
      where,
    });
    return {
      list: result,
      pagination: {
        total,
        pageNum: query.pageNum,
        pageSize: query.pageSize,
      },
    };
  }

  async findOne(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException(`Not Found user a id:${id}`);
    return user;
  }

  /**根据openId查询用户 */
  async findUserByOpenId(openId:string): Promise<User> {
    return await this.prisma.user.findUnique({ where: { openId } });
  }

  async findOneUser(where: Prisma.UserWhereInput): Promise<User> {
    const user = await this.prisma.user.findFirst({ where: where });
    // findUnique({ where: { phone } });
    if (!user) {
      // 找不到用户 404
      throw new NotFoundException(`No user found for phone: ${where.phone}`);

      // 为了安全 我这边提示 用户账户或密码错误

      // throw new HttpException(`用户账户或密码错误`, HttpStatus.BAD_REQUEST);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    if (updateUserDto.password) {
      const salt = await bcrypt.genSalt();
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, salt);
    }
    try {
      const user = await this.prisma.user.update({
        where: { id },
        data: updateUserDto,
      });
      if (!user) throw new NotFoundException(`Not Found user a id:${id}`);
      return user;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('要更新的用户不存在！');
      }
      throw new HttpException('未知异常', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number): Promise<boolean> {
    let flag = false;
    try {
      const user = await this.prisma.user.delete({ where: { id } });
      if (!user) throw new NotFoundException(`Not Found user a id:${id}`);
      flag = true;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('要删除的用户不存在！');
      }
      throw new HttpException('未知异常', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return flag;
  }

  async deleteMany(ids: number[]): Promise<Prisma.BatchPayload> {
    if (!ids.length) {
      throw new HttpException(`ids不能为空`, HttpStatus.BAD_REQUEST);
    }
    const result = await this.prisma.user.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
    return result;
  }
}
