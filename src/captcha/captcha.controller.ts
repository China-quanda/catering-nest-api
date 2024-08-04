import { Controller, Post, Body } from '@nestjs/common';
import { CaptchaService } from './captcha.service';

import { BaseController } from 'src/common/controller';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { generateCaptchaDto, validateCaptchaDto } from './dto/captcha.dto';
@ApiTags('验证码')
@Controller(['miniprogram/captcha', 'shop/captcha'])
export class CaptchaController extends BaseController {
  constructor(private readonly captchaService: CaptchaService) {
    super();
  }

  @Post('generateCaptcha')
  @ApiOperation({ summary: '生成验证码' })
  // @ApiCreatedResponse({ type: Captcha })
  async generateCaptcha(@Body() body?: generateCaptchaDto) {
    if (body?.account && body.account.length != 11) {
      return this.error('手机号码有误');
    }

    const result = await this.captchaService.generateCaptcha(body);
    return this.success(result);
  }

  @Post('validateCaptcha')
  @ApiOperation({ summary: '验证' })
  // @ApiCreatedResponse({ type: Captcha })
  async validateCaptcha(@Body() body: validateCaptchaDto) {
    const result = await this.captchaService.validateCaptcha(body);
    return this.success(result);
  }
}
