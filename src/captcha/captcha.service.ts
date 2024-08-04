import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
// import * as svgCaptcha from 'svg-captcha';
import { Captcha, Prisma } from '@prisma/client';
import { generateCaptchaDto, validateCaptchaDto } from './dto/captcha.dto';
@Injectable()
export class CaptchaService {
  constructor(private prisma: PrismaService) {}

  async generateCaptcha(body?: generateCaptchaDto): Promise<Captcha> {
    if (body?.account) {
      // 检查用户是否在短时间内获取验证码过于频繁
      const now = new Date();
      const attempts = await this.prisma.captcha.count({
        where: {
          account: body.account,
          createTime: {
            gte: new Date(now.getTime() - 30 * 60 * 1000), // 30 分钟前,
            // lte: now,
          },
        },
      });

      if (attempts >= 5) {
        throw new HttpException(
          '获取验证码太频繁，请稍后30分钟再试',
          HttpStatus.BAD_REQUEST,
        );
      }

      const captchas = await this.prisma.captcha.count({
        orderBy: {
          createTime: 'desc',
        },
        where: {
          account: body.account,
          createTime: {
            gte: new Date(Date.now() - 60 * 1000), // 1 分钟前
            lte: now,
          },
        },
      });
      if (captchas > 0) {
        throw new HttpException(
          '获取验证码太频繁，请稍后1分钟再试',
          HttpStatus.BAD_REQUEST,
        );
      }
      // if(captcha?.createTime && captcha.expiresTime > new Date())
    }

    // 生成一个六位数的验证码
    const code = Math.random().toString(36).substring(2, 8);

    // 五分钟后过期
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
    const captcha = await this.prisma.captcha.create({
      data: {
        account: body?.account || null,
        code: code,
        expiresTime: body?.expiresTime || expiresAt,
      },
    });

    return captcha;
  }

  async validateCaptcha(body: validateCaptchaDto): Promise<boolean> {

    const where = {
      code: body.code,
      // createTime: {
      //   gte: new Date(Date.now() - 60 * 1000) // 1 分钟前
      // },
    } as Prisma.CaptchaWhereUniqueInput;

    if (body?.account) {
      where.account = body.account;
    }

    const captcha = await this.prisma.captcha.findFirst({
      orderBy: {
        createTime: 'desc',
      },
      where,
    });

    // 验证码不存在
    if (!captcha) {
      return false;
    }

    // 验证码已过期
    if (captcha.expiresTime < new Date()) {
      return false;
    }

    // 验证码已被使用
    if (captcha.used === 1) {
      return false;
    }

    await this.prisma.captcha.update({
      where: {
        id: captcha.id,
      },
      data: {
        used: 1,
      },
    });

    return true;
  }
}
