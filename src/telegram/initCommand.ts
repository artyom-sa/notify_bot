import type TelegramBot from 'node-telegram-bot-api';
import { COMMANDS_LIST } from '../constants/commands.ts';

export const initCommands = async (bot: TelegramBot) => {
  await bot.setMyCommands(COMMANDS_LIST);
};
