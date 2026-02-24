import TelegramBot from 'node-telegram-bot-api';

import type { TelegramApi } from '../api/api.ts';
import { registerCommandListeners } from './commands.ts';
import { registerMentionListeners } from './mentions.ts';

export function registerTelegramListeners(
  bot: TelegramBot,
  telegramApi: TelegramApi
) {
  registerCommandListeners(bot, telegramApi);
  registerMentionListeners(bot, telegramApi);
}
