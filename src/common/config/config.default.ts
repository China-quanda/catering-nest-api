import { defineConfig } from './index';

export default defineConfig({
  jwt: {
    secret: 'secret',
    signOptions: { expiresIn: '12' },
  },
});
