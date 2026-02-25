import { requireEnv } from '../config/env.ts';

const isDev = requireEnv('NODE_ENV') === 'development';

export const stringifyValue = (value: any) =>
  isDev ? JSON.stringify(value, null, 2) : JSON.stringify(value);
