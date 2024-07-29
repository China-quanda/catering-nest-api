import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { Prisma, Shop } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { ResultList } from 'src/utils/result';
import { QueryShopDto } from './dto/query-shop.dto';

@Injectable()
export class ShopService {
  constructor(private prisma: PrismaService) {}

  async create(body: CreateShopDto): Promise<Shop> {
    const result = await this.prisma.shop.create({
      data: body,
    });
    if (!result) throw new HttpException('创建失败！', HttpStatus.BAD_REQUEST);
    return result;
  }

  async findAll(query?: QueryShopDto): Promise<ResultList<Shop[]>> {
    query = Object.assign(
      {
        ...query,
        pageNum: 1,
        pageSize: 10,
      },
      query,
    );
    console.log('query', query);
    const where: Prisma.ShopWhereInput = {
      AND: [
        {
          no: {
            equals: query.no,
          },
        },
        // {
        //   status: {
        //     equals: query.status,
        //   },
        // },
        {
          country: {
            contains: query.country,
          },
        },
        {
          province: {
            contains: query.province,
          },
        },
        {
          city: {
            contains: query.city,
          },
        },
        {
          district: {
            contains: query.district,
          },
        },
      ],
    };
    const result = await this.prisma.shop.findMany({
      where,
      take: query.pageSize,
      skip: (query.pageNum - 1) * query.pageSize,
    });
    const total = await this.prisma.shop.count({
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

  async findOne(id: number): Promise<Shop> {
    const result = await this.prisma.shop.findUnique({
      where: { id },
    });
    if (!result) throw new NotFoundException(`Not Found a id:${id}`);
    return result;
  }

  async update(id: number, body: UpdateShopDto): Promise<Shop> {
    try {
      const result = await this.prisma.shop.update({
        where: { id },
        data: body,
      });
      if (!result) throw new NotFoundException(`Not Found a id:${id}`);
      return result;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('要更新的目标不存在！');
      }
      throw new HttpException('未知异常', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number): Promise<Shop> {
    try {
      const result = await this.prisma.shop.delete({
        where: { id },
      });
      if (!result) throw new NotFoundException(`Not Found a id:${id}`);

      return result;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('要删除的目标不存在！');
      }
      throw new HttpException('未知异常', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async deleteMany(ids: number[]): Promise<Prisma.BatchPayload> {
    if (!ids.length) {
      throw new HttpException(`ids不能为空`, HttpStatus.BAD_REQUEST);
    }
    const result = await this.prisma.shop.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
    return result;
  }
}
