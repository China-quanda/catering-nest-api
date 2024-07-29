import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  HttpExceptionFilter,
  PrismaClientKnownRequestErrorFilter,
} from './common/filter';
import { ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './common/Interceptor';
import { ConfigService } from '@nestjs/config';
import { NestConfig } from './config';
async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['error', 'warn'],
  });

  const configService = app.get(ConfigService);
  const nestConfig = configService.get<NestConfig>('nest');

  // 配置管道
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  // 设置 api 访问前缀
  app.setGlobalPrefix('/api');

  // 配置过滤器
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(
    new PrismaClientKnownRequestErrorFilter(httpAdapter),
    new HttpExceptionFilter(),
  );

  // 配置拦截器
  app.useGlobalInterceptors(new LoggingInterceptor());

  //配置静态资源目录
  app.useStaticAssets('public', { prefix: nestConfig.static });

  // swagger文档
  const config = new DocumentBuilder()
    .setTitle('api文档')
    .setDescription('这是api文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/document', app, document);

  await app.listen(3000);
  console.log('listening on port 3000', 'is open http://localhost:3000/api');
}
bootstrap();
