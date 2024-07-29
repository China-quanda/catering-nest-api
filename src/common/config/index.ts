/* eslint-disable @typescript-eslint/no-var-requires */

import { Config } from './config.interface';
export * from './config.interface';

export const defineConfig = (config: Config): Config => config;

// 根据环境变量判断使用配置
export default (): Config => {
  let config: Config;
  let defaultConfig = {};
  let envConfig = {};

  try {
    defaultConfig = require('./config.default').default;
    envConfig = require(`./config.${process.env.NODE_ENV}`).default;
    config = Object.assign(defaultConfig, envConfig);
  } catch (e) {
    console.error(`config Error ${e}`);
  }
  // 返回环境配置
  return config;
};
