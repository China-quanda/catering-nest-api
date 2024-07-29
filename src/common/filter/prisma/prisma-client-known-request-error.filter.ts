import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
// prisma PrismaClientKnownRequestError link
// https://www.prisma.io/docs/orm/reference/error-reference#prisma-client-query-engine
@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientKnownRequestErrorFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const message = exception.message.replace(/\n/g, '');
    if (exception.code === 'P2002') {
      const status = HttpStatus.CONFLICT;
      response.status(status).json({
        statusCode: status,
        message: message,
      });
    } else if (exception.code === 'P2025') {
      const status = HttpStatus.NOT_FOUND;
      response.status(status).json({
        statusCode: status,
        message: message,
      });
    } else {
      super.catch(exception, host);
    }
  }
}
