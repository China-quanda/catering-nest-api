import { defineConfig } from './index';
export default defineConfig({
  minio: {
    endPoint: 'localhost',
    port: 9000,
    useSSL: false,
    accessKey: 'minio',
    secretKey: 'minio123',
  },
  jwt: {
    secret: 'topSecret511',
    signOptions: { expiresIn: '5m' }, // e.g. 30s, 7d, 24h
  },
  // 预览模式
  isPreview: false,
  redis: {
    host: '127.0.0.1',
    port: 6379,
    password: '123456',
    db: 0,
  },
  nest: {
    static: '/public',
    views: 'views',
    template: 'ejs',
    admin: {
      port: 3000,
      prefix: '/api/admin',
    },
    mobile: {
      port: 3002,
      prefix: '/api/mobile',
    },
  },
  cors: {
    enabled: true,
  },
  security: {
    secret: 'topSecret51',
    refreshSecret: 'refreshSecret',
    expiresIn: '5m',
    refreshIn: '7d',
    bcryptSaltOrRound: 10,
  },
  swagger: {
    admin: {
      enabled: true,
      title: '管理端api文档',
      description: '这是移管理的api文档',
      version: '1.0',
      path: 'api/admin/document',
    },
    mobile: {
      enabled: true,
      title: '移动端api文档',
      description: '这是移动端的api文档',
      version: '1.0',
      path: 'api/mobile/document',
    },
  },
});
