import type TelegramBot from 'node-telegram-bot-api';

export type SendMessage = {
  text: string;
  chatId: number;
};

// It's made as a function that returns a function.
// Firstly: the function itself creates a new function from the Telegram API.
// Secondly: so that at the top level, when we wrap it in wrapWithLogger() in the api.ts file, it works correctly, since wrapWithLogger logs the function name.
export const createSendMessage = (telegramBot: TelegramBot) => {
  return async function sendMessage({ text, chatId }: SendMessage) {
    return await telegramBot.sendMessage(chatId, text, { parse_mode: 'HTML' });
  };
};
