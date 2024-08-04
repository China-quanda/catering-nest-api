import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiCreatedResponse } from '@nestjs/swagger';
import { SignInEntity } from './entities/signIn.entity';

import { BaseController } from 'src/common/controller';
import { CodeDto, PhoneCodeLogin } from './dto/auth.dto';
@ApiTags('小程序auth授权')
@Controller('miniprogram/auth')
export class AuthMiniprogramController extends BaseController {
  constructor(private readonly authService: AuthService) {
    super();
  }

  @ApiOperation({ summary: '微信小程序登陆' })
  @ApiCreatedResponse({ type: SignInEntity })
  @Post('login')
  async login(@Body() body: CodeDto) {
    const result = await this.authService.miniprogramLogin(body);
    return this.success(result);
  }

  @ApiOperation({ summary: '手机号码登录' })
  @ApiCreatedResponse({ type: SignInEntity })
  @Post('phoneCodeLogin')
  async phoneCodeLogin(@Body() body: PhoneCodeLogin) {
    const result = await this.authService.phoneCodeLogin(body);
    return this.success(result);
  }
}
