// 登录守卫 ，后续可进行登录日志记录 参考地址/meimei-new/src/common/guards/local-auth.guard.ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
