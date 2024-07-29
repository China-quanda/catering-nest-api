// jwt 校验守卫
//src/auth/jwt-auth.guard.ts
// import { IS_PUBLIC_KEY } from '@app/common/decorator/public.decorator';
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { pathToRegexp } from 'path-to-regexp';
import { IS_PUBLIC_KEY } from 'src/common/decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // 白名单
  private globalWhiteList = [];
  constructor(private reflector: Reflector) {
    super();
    // this.globalWhiteList = [
    //   { path: '/captchaImage', method: 'GET' },
    //   { path: '/register', method: 'POST' },
    //   { path: '/login', method: 'POST' },
    //   { path: '/logout', method: 'POST' },
    //   { path: '/perm/{id}', method: 'GET' },
    //   { path: '/upload', method: 'POST' },
    // ];
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // 如果在白名单直接跳过
    // const isInWhiteList = this.checkWhiteList(ctx);
    // if (isInWhiteList) {
    //   return true;
    // }

    // 如果是公开接口，则直接放行 不需认证
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }

  /**
   * 检查接口是否在白名单内
   * @param ctx
   * @returns
   */
  checkWhiteList(ctx: ExecutionContext): boolean {
    const req = ctx.switchToHttp().getRequest();
    const i = this.globalWhiteList.findIndex((route) => {
      // 请求方法类型相同
      if (req.method.toUpperCase() === route.method.toUpperCase()) {
        // 对比 url
        return !!pathToRegexp(route.path).exec(req.url);
      }
      return false;
    });
    // 在白名单内 则 进行下一步， i === -1 ，则不在白名单，需要 比对是否有当前接口权限
    return i > -1;
  }

  /* 主动处理错误 */
  handleRequest(err, user, info) {
    console.log('JwtStrategy-handleRequest', err, user, info);
    if (err || !user || !user.userName) {
      throw err || new UnauthorizedException('登录状态已过期');
    }
    // 返回值会被挂载到request的user上
    return user;
  }
}
