import { logger } from '../../utils/logger.ts';
import { stringifyValue } from '../../utils/stringifyValue.ts';

export const errorEvent = async (error) =>
  logger('error', `[🤖 Ошибка бота: ${stringifyValue(error)}]`);
