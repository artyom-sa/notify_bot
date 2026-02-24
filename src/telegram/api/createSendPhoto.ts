import type TelegramBot from 'node-telegram-bot-api';

type SendPhoto = {
  chatId: number;
  img: Parameters<TelegramBot['sendPhoto']>[1];
  text: string;
};

// It's made as a function that returns a function.
// Firstly: the function itself creates a new function from the Telegram API.
// Secondly: so that at the top level, when we wrap it in wrapWithLogger() in the api.ts file, it works correctly, since wrapWithLogger logs the function name.
export const createSendPhoto = (telegramBot: TelegramBot) => {
  return async function sendPhoto({ chatId, img, text }: SendPhoto) {
    return await telegramBot.sendPhoto(chatId, img, { caption: text });
  };
};
