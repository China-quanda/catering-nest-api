import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiCreatedResponse } from '@nestjs/swagger';
import { SignInEntity } from './entities/signIn.entity';
import { RefreshTokenInput } from './dto/refresh-token.input';
import { SignInDto } from './dto/sign.dto';
import { Public } from 'src/common/decorator';
import { UserEntity } from '../user/entities/user.entity';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LocalAuthGuard } from './guard/local-auth.guard';

import { BaseController } from 'src/common/controller';
import { CodeDto } from './dto/auth.dto';
@ApiTags('小程序auth授权')
@Controller('miniprogram/auth')
export class AuthMiniprogramController extends BaseController {
  constructor(private readonly authService: AuthService) {
    super();
  }

  @ApiOperation({ summary: '微信小程序登陆' })
  @ApiCreatedResponse({ type: SignInEntity })
  @Post('login')
  async login(@Body() body : CodeDto) {
    const result = await this.authService.miniprogramLogin(body)
    return this.success(result)
  }
  
}
