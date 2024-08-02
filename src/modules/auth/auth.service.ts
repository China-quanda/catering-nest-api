import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SignInDto } from './dto/sign.dto';
import { Miniprogram, SecurityConfig } from 'src/config';
import { SignInEntity } from './entities/signIn.entity';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../user/dto/create-user.dto';
const querystring = require('node:querystring');
import axios from "axios";
import { generateRandomString } from "src/utils/random";

import { CodeDto, PhoneCodeLogin } from './dto/auth.dto';
import { GetOpenidRes, ResType } from 'src/common/types/auth';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CaptchaService } from 'src/captcha/captcha.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private prisma: PrismaService,
    private readonly captchaService: CaptchaService,
  ) { }


  /**
   * 微信小程序登录，有就登录，没有就注册
   * @param body 
   * @returns 
   */
  async miniprogramLogin(body: CodeDto): Promise<SignInEntity> {

    const result = await this.getOpenid(body)

    const user = await this.userService.findUserByOpenId(result.openid)

    if (user) {
      return this.generateTokens({ userId: user.id });
    }

    const createUser = await this.userService.create({
      name: '小螺丝',
      openId: result.openid,
      password: generateRandomString(10)
    })
    return this.generateTokens({ userId: createUser.id });
  }
  async phoneCodeLogin(body: PhoneCodeLogin): Promise<SignInEntity> {


    console.log('body',body);
    

    const user = await this.prisma.user.findUnique({
      where: {
        phone:body.phone
      }
    })

    console.log('user',user);
    

    if (user) {
      const isValid = await this.captchaService.validateCaptcha({ account: String(body.phone), code: body.code })
      if(!isValid) {
        throw new HttpException('验证码错误', HttpStatus.BAD_REQUEST)
      }
      return this.generateTokens({ userId: user.id });
    }

    const createUser = await this.userService.create({
      phone: body.phone,
      name: '小螺丝',
      password: generateRandomString(10)
    })
    return this.generateTokens({ userId: createUser.id });
  }

  /**
   * 获取微信openid
   * @param body 
   * @returns 
   */
  private async getOpenid(body: CodeDto): Promise<GetOpenidRes> {

    const miniprogramConfig = this.configService.get<Miniprogram>('miniprogram');

    const params = querystring.stringify({
      appid: miniprogramConfig.appid,
      secret: miniprogramConfig.secret,
      js_code: body.code,
      grant_type: 'authorization_code'
    })

    // 调用微信官方接口sns/jscode2session，使用code换取session_key和openid：
    const url = `https://api.weixin.qq.com/sns/jscode2session?${params}`;

    try {
      const response = await axios.get(url)

      const data: ResType = response.data;

      if (data?.errcode === 40029) {
        throw new HttpException('js_code无效', HttpStatus.FORBIDDEN)
      } else if (data?.errcode === 45011) {
        throw new HttpException('API 调用太频繁，请稍候再试', HttpStatus.FORBIDDEN)
      } else if (data?.errcode === 40226) {
        throw new HttpException('高风险等级用户，小程序登录拦截 。风险等级详见 https://developers.weixin.qq.com/miniprogram/dev/framework/operation.html', HttpStatus.FORBIDDEN)
      } else if (data?.errcode === -1) {
        throw new HttpException('系统繁忙，此时请开发者稍候再试', HttpStatus.FORBIDDEN)
      } else if (!data.session_key || !data.openid) {
        throw new HttpException('Failed to exchange code for session_key and openid', HttpStatus.FORBIDDEN)
      } else {
        const session_key = data.session_key;
        const openid = data.openid;

        const res = { session_key, openid }

        return res
      }

    } catch (error) {
      console.error('error', error);
      throw new Error(error);
    }
  }



  // 本地验证策略 账户密码登录 并返回user
  async validateUser(signInDto: SignInDto): Promise<any> {
    const { phone, password } = signInDto;
    const user = await this.userService.findOneUser({ phone });

    if (!user) {
      throw new NotFoundException(`No user found for phone: ${phone}`);
    }

    const isPasswordValid: boolean = await bcrypt.compare(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('账户或密码错误');
    }
    return user;
  }

  async singUp(signUpDto: CreateUserDto): Promise<SignInEntity> {
    console.log('signUpDto', signUpDto);
    const user = await this.userService.create(signUpDto);
    return this.generateTokens({ userId: user.id });
  }

  // 账户密码登录 并返回token
  async signIn(signInDto: SignInDto): Promise<SignInEntity> {
    const { phone, password } = signInDto;
    // Step 1: Fetch a user with the given username
    const user = await this.userService.findOneUser({ phone });

    // 这个步骤在 findOneUser 这边已经做了
    // If no user is found, throw an error
    if (!user) {
      throw new NotFoundException(`No user found for phone: ${phone}`);
    }

    // Step 2: Check if the password is correct
    const isPasswordValid: boolean = await bcrypt.compare(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('账户或密码错误');
    }

    // Step 3: Generate a JWT containing the user's ID and return it
    return this.generateTokens({ userId: user.id });
  }

  async refreshToken(token: string): Promise<SignInEntity> {
    const securityConfig = this.configService.get<SecurityConfig>('security');
    try {
      const { userId } = this.jwtService.verify(token, {
        secret: securityConfig.refreshSecret,
      });

      return this.generateTokens({ userId });
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async getUserFromToken(token: string): Promise<User> {
    const id = this.jwtService.decode(token)['userId'];
    return await this.userService.findOne(id);
  }

  generateTokens(payload: { userId: string | number }): SignInEntity {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    };
  }

  private generateAccessToken(payload: { userId: string | number }): string {
    return this.jwtService.sign(payload);
  }

  private generateRefreshToken(payload: { userId: string | number }): string {
    const securityConfig = this.configService.get<SecurityConfig>('security');
    return this.jwtService.sign(payload, {
      secret: securityConfig.refreshSecret,
      expiresIn: securityConfig.refreshIn,
    });
  }
}
