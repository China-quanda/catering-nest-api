import { defineConfig } from './index';
export default defineConfig({
  jwt: {
    secret: 'hh@i6i8.cn',
    signOptions: { expiresIn: '24h' }, // e.g. 30s, 7d, 24h
  },
  cors: {
    enabled: false,
  },
});
