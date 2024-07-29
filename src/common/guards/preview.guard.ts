// 是否演示环境守卫
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PreviewGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPreview = this.configService.get<boolean>('isPreview');
    if (!isPreview) return true;
    const request: Request = context.switchToHttp().getRequest();
    const allowUrlArr = ['/login', '/logout']; //放过的路由
    if (
      request.method.toLocaleLowerCase() != 'get' &&
      !allowUrlArr.includes(request.url)
    )
      throw new HttpException('演示环境,不允许操作', HttpStatus.FORBIDDEN);
    return true;
  }
}
