import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Result } from '../../utils/result';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor() {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const [req] = context.getArgs();
    const now = Date.now();
    return next
      .handle()
      .pipe(
        map((val) => {
          if (!val || val.code === undefined) {
            return Result.success({ data: val });
          }
          return val;
        }),
      )
      .pipe(
        tap((data) => {
          const msg = `
      ---------------开始----------------
      请求类: ${context.getClass().name}
      请求方法: ${context.getHandler().name}
      请求地址: ${req.url}
      请求参数: href -> ${JSON.stringify(req.href)}
      请求路径: path -> ${JSON.stringify(req.path)}
      请求方式: ${req.method}
      请求参数2: body -> ${JSON.stringify(req.body)}
      请求参数: query -> ${JSON.stringify(req.query)}
      请求用时: ${Date.now() - now}ms
      响应数据: ${JSON.stringify(data)}
      ---------------结束----------------
      `;
          console.log('debug===', msg);
        }),
      );
  }
}
