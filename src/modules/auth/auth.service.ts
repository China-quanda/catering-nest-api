import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SignInDto } from './dto/sign.dto';
import { SecurityConfig } from 'src/config';
import { SignInEntity } from './entities/signIn.entity';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

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
