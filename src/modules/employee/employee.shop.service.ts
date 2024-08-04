import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee, Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { QueryEmployeeDto } from './dto/query-employee.dto';
import { ResultList } from 'src/utils/result';
import { LoginEmployeeDto } from './dto/login-employee.dto';
import * as bcrypt from 'bcrypt';
import { CaptchaService } from 'src/captcha/captcha.service';
import { SignInEntity } from '../auth/entities/signIn.entity';
import { JwtService } from '@nestjs/jwt';
import { SecurityConfig } from 'src/config';
import { ConfigService } from '@nestjs/config';
import { ShopService } from '../shop/shop.service';

@Injectable()
export class ShopEmployeeService {
  constructor(
    private prisma: PrismaService,
    private captchaService: CaptchaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly shopService: ShopService,
  ) {}

  async create(body: CreateEmployeeDto): Promise<Employee> {
    const salt = await bcrypt.genSalt();
    body.password = await bcrypt.hash(body.password, salt);

    const result = await this.prisma.employee.create({
      data: body,
    });
    if (!result) throw new HttpException('创建失败！', HttpStatus.BAD_REQUEST);
    return result;
  }

  async findAll(query?: QueryEmployeeDto): Promise<ResultList<Employee[]>> {
    query = Object.assign(
      {
        ...query,
        pageNum: 1,
        pageSize: 10,
      },
      query,
    );
    console.log('query', query);
    const where: Prisma.EmployeeWhereInput = {
      AND: [
        {
          name: {
            contains: query.name,
          },
        },
        {
          sex: {
            equals: query.sex,
          },
        },
        {
          phone: {
            contains: query.phone,
          },
        },
        {
          idNumber: {
            contains: query.idNumber,
          },
        },
        {
          status: {
            equals: query.status,
          },
        },
      ],
    };

    const result = await this.prisma.employee.findMany({
      where,
      take: query.pageSize,
      skip: (query.pageNum - 1) * query.pageSize,
    });
    const total = await this.prisma.employee.count({
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

  async findOne(id: number): Promise<Employee> {
    const result = await this.prisma.employee.findUnique({
      where: { id },
    });
    if (!result) throw new NotFoundException(`Not Found a id:${id}`);
    return result;
  }

  async update(id: number, body: UpdateEmployeeDto): Promise<Employee> {
    try {
      const result = await this.prisma.employee.update({
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

  async remove(id: number): Promise<Employee> {
    try {
      const result = await this.prisma.employee.delete({
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
    const result = await this.prisma.employee.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
    return result;
  }

  async login(body: LoginEmployeeDto): Promise<SignInEntity> {
    const isCaptcha = await this.captchaService.validateCaptcha({
      code: body.code,
      account: body.phone,
    });

    if (!isCaptcha) {
      throw new HttpException('验证码错误', HttpStatus.BAD_REQUEST);
    }

    const employee = await this.prisma.employee.findFirst({
      where: {
        phone: body.phone,
      },
    });

    if (!employee) {
      throw new UnauthorizedException('账户或密码错误');
    }

    const isPasswordValid: boolean = await bcrypt.compare(
      body.password,
      employee.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('账户或密码错误');
    }

    const securityConfig = (await this.configService.get(
      'security',
    )) as SecurityConfig;
    return {
      accessToken: this.jwtService.sign(
        { userId: employee.id },
        {
          secret: securityConfig.secret,
          expiresIn: securityConfig.expiresIn,
        },
      ),
      refreshToken: this.jwtService.sign(
        { userId: employee.id },
        {
          secret: securityConfig.refreshSecret,
          expiresIn: securityConfig.refreshIn,
        },
      ),
    };
  }

  async getInfo(id: number) {
    const employee = await this.prisma.employee.findUnique({
      where: {
        id,
      },
    });

    if (!employee) {
      throw new HttpException('当前员工不存在', HttpStatus.BAD_REQUEST);
    }

    const shop = await this.shopService.findOne(employee.shopId);

    if (!shop) {
      throw new HttpException('当前员工所属店铺不存在', HttpStatus.BAD_REQUEST);
    }

    return {
      employee,
      shop,
    };
  }
}
