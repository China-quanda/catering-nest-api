import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address, Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { ResultList } from 'src/utils/result';
import { QueryAddressDto } from './dto/query-address.dto';

@Injectable()
export class AddressService {
  constructor(private prisma: PrismaService) {}

  async create(body: CreateAddressDto): Promise<Address> {
    const result = await this.prisma.address.create({
      data: body,
    });
    if (!result) throw new HttpException('创建失败！', HttpStatus.BAD_REQUEST);
    return result;
  }

  async findAll(query?: QueryAddressDto): Promise<ResultList<Address[]>> {
    query = Object.assign(
      {
        ...query,
        pageNum: 1,
        pageSize: 10,
      },
      query,
    );
    console.log('query', query);
    let where: Prisma.AddressWhereInput = {
      AND: [
        {
          user:{
            id:query.userId
          }
        },
        {
          sex: {
            equals: query.sex,
          },
        },
        // {
        //   status: {
        //     equals: query.status,
        //   },
        // },
        {
          name: {
            contains: query.name,
          },
        },
        {
          phone: {
            contains: query.phone,
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
  
    const result = await this.prisma.address.findMany({
      where,
      take: query.pageSize,
      skip: (query.pageNum - 1) * query.pageSize,
    });
    const total = await this.prisma.address.count({
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

  async findOne(id: number): Promise<Address> {
    const result = await this.prisma.address.findUnique({
      where: { id },
    });
    if (!result) throw new NotFoundException(`Not Found a id:${id}`);
    return result;
  }

  async update(id: number, body: UpdateAddressDto): Promise<Address> {
    try {
      const result = await this.prisma.address.update({
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

  async remove(id: number): Promise<Address> {
    try {
      const result = await this.prisma.address.delete({
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
    const result = await this.prisma.address.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
    return result;
  }
}
