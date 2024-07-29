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
@ApiTags('auth授权')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @ApiOperation({ summary: '注册' })
  @ApiCreatedResponse({ type: UserEntity })
  @Post('singUp')
  async singUp(@Body() signUpDto: CreateUserDto): Promise<SignInEntity> {
    console.log('signUpDto', signUpDto);
    return await this.authService.singUp(signUpDto);
  }

  @ApiOperation({ summary: '登录' })
  @ApiCreatedResponse({ type: SignInEntity })
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('singIn')
  // async singIn(@Body() signInDto: SignInDto): Promise<SignInEntity> {
  //   return await this.authService.signIn(signInDto);
  // }
  async singIn(
    @Body() signInDto: SignInDto,
    @Request() req,
  ): Promise<SignInEntity> {
    console.log('singIn', signInDto);
    console.log('req.user', req.user);
    return await this.authService.generateTokens({ userId: req.user.id });
  }

  @ApiOperation({ summary: '刷新token' })
  @ApiCreatedResponse({ type: SignInEntity })
  @Post('refreshToken')
  async refreshToken(
    @Body() { token }: RefreshTokenInput,
  ): Promise<SignInEntity> {
    return await this.authService.refreshToken(token);
  }
}
