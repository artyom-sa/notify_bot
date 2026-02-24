import type TelegramBot from 'node-telegram-bot-api';
import type { TelegramApi } from './telegram/api/api.ts';

export type CommandHandlerArgs = {
  bot: TelegramBot;
  api: TelegramApi;
  msg: TelegramBot.Message;
  match: RegExpExecArray | null;
};
