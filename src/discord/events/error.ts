import { logger } from '../../utils/logger.ts';

export const errorEvent = async (error) =>
  logger('error', `[🤖 Ошибка бота: ${JSON.stringify(error, null, 2)}]`);
