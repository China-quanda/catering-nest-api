import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('miniapp/login/phoneNumberLogin')
  async phoneNumberLogin(@Body() body: any) {
    console.log(body);
    // const { code, encryptedData, iv } = body;
    const code = body.code;

    const APP_ID = 'wxd5abd9f03cb39b0e';
    const APP_SECRET = '72f7bc51ee70b00544a3a93ee98d121c';

    // 1、使用code换取session_key和openid
    // 调用微信官方接口sns/jscode2session，使用code换取session_key和openid：
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${APP_ID}&secret=${APP_SECRET}&js_code=${code}&grant_type=authorization_code`;
    const response = await fetch(url);
    const data = await response.json();
    console.log('data', data);
    if (!data.session_key || !data.openid) {
      throw new Error('Failed to exchange code for session_key and openid');
    }

    // const session_key = data.session_key;
    // const openid = data.openid;

    // 2、使用session_key解密手机号

    return this.success(body);
  }

  private success(data, message = 'success', code = 0) {
    return {
      code,
      data,
      message,
    };
  }
}
