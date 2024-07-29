import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { Prisma, Table } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { ResultList } from 'src/utils/result';

@Injectable()
export class TableService {
  constructor(private prisma: PrismaService) {}


  async create(body: CreateTableDto): Promise<Table> {
    const result = await this.prisma.table.create({
      data: body,
    });
    if (!result) throw new HttpException('创建失败！', HttpStatus.BAD_REQUEST);
    return result;
  }

  async findAll(): Promise<ResultList<Table[]>> {
    const result = await this.prisma.table.findMany();
    const total = await this.prisma.table.count();
    return {
      list: result,
      pagination: {
        total,
        pageNum: 1,
        pageSize: 100,
      },
    };
  }

  async findOne(id: number): Promise<Table> {
    const result = await this.prisma.table.findUnique({
      where: { id },
    });
    if (!result) throw new NotFoundException(`Not Found a id:${id}`);
    return result;
  }


  async update(id: number, body: UpdateTableDto): Promise<Table> {
    try {
      const result = await this.prisma.table.update({
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

  async remove(id: number): Promise<Table> {
    try {
      const result = await this.prisma.table.delete({
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
    const result = await this.prisma.table.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
    return result;
  }
}
