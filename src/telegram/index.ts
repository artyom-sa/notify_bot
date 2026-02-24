import TelegramBot from 'node-telegram-bot-api';

import { requireEnv } from '../config/env.ts';
import { initCommands } from './initCommand.ts';

export function createTelegramBot() {
  const bot = new TelegramBot(requireEnv('TELEGRAM_TOKEN'), {
    polling: true
  });

  initCommands(bot);

  return bot;
}
