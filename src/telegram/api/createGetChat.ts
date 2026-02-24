import type TelegramBot from 'node-telegram-bot-api';

type GetChat = {
  chatId: number;
};

// It's made as a function that returns a function.
// Firstly: the function itself creates a new function from the Telegram API.
// Secondly: so that at the top level, when we wrap it in wrapWithLogger() in the api.ts file, it works correctly, since wrapWithLogger logs the function name.
export const createGetChat = (telegramBot: TelegramBot) => {
  return async function getChat({ chatId }: GetChat) {
    return await telegramBot.getChat(chatId);
  };
};
