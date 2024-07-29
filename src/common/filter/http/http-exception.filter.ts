// import { Result } from '@app/common/utils/result';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    if (status === 400) {
      // 验证请求报错 应该捕获class-validator
      // const e: any = exception.getResponse();
      // console.log(e.message)
      // response.status(status).json({
      //   code: status,
      //   message: e.message[0] || exception.message,
      //   data: null,
      // });
      // 自定义报错
      response.status(status).json({
        code: status,
        message: exception.message,
        data: null,
      });
    } else if (status === 404) {
      response.status(status).json({
        code: status,
        message: exception.message,
        data: null,
      });
    } else {
      response.status(status).json({
        code: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        describe: exception.message,
      });
    }
  }
}
