import { SetMetadata } from '@nestjs/common';
// 公开的，不需要登录授权也可以访问
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
