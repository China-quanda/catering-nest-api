import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Category, Prisma } from '@prisma/client';
import { ResultList } from 'src/utils/result';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}


  async create(body: CreateCategoryDto): Promise<Category> {
    const result = await this.prisma.category.create({
      data: body,
    });
    if (!result) throw new HttpException('创建失败！', HttpStatus.BAD_REQUEST);
    return result;
  }

  async findAll(): Promise<ResultList<Category[]>> {
    const result = await this.prisma.category.findMany();
    const total = await this.prisma.category.count();
    return {
      list: result,
      pagination: {
        total,
        pageNum: 1,
        pageSize: 100,
      },
    };
  }

  async findOne(id: number): Promise<Category> {
    const result = await this.prisma.category.findUnique({
      where: { id },
    });
    if (!result) throw new NotFoundException(`Not Found a id:${id}`);
    return result;
  }


  async update(id: number, body: UpdateCategoryDto): Promise<Category> {
    try {
      const result = await this.prisma.category.update({
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

  async remove(id: number): Promise<Category> {
    try {
      const result = await this.prisma.category.delete({
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
    const result = await this.prisma.category.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
    return result;
  }
}
