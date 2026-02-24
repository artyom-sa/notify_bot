import TelegramBot from 'node-telegram-bot-api';
import type { TelegramApi } from '../api/api.ts';
import { COMMANDS_LIST } from '../../constants/commands.ts';
import { commands } from '../commands/index.ts';

export function registerCommandListeners(bot: TelegramBot, api: TelegramApi) {
  COMMANDS_LIST.forEach(({ pattern, command }) => {
    bot.onText(pattern, (msg, match) =>
      commands[command]({ api, msg, match, bot })
    );
  });
}
