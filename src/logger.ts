type Level = 'info' | 'error' | 'warn' | 'debug';

const prefix: Record<Level, string> = {
  info: 'INFO',
  error: 'ERROR',
  warn: 'WARN',
  debug: 'DEBUG'
};

export const log = {
  info: (message: string) => console.log(`[${prefix.info}] ${message}`),
  error: (message: string, error?: unknown) => {
    console.error(`[${prefix.error}] ${message}`);
    if (error !== undefined) console.error(error);
  },
  warn: (message: string) => console.warn(`[${prefix.warn}] ${message}`),
  debug: (message: string) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[${prefix.debug}] ${message}`);
    }
  }
};
