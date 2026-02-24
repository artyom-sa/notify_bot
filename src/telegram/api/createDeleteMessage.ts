import type TelegramBot from 'node-telegram-bot-api';

const DELETE_AFTER_MS = 2 * 60 * 60 * 1000; // 2 hours

type DeleteTelegramMessageWithDelay = {
  messageId: number;
  chatId: number;
  delay: number;
};

// It's made as a function that returns a function.
// Firstly: the function itself creates a new function from the Telegram API.
// Secondly: so that at the top level, when we wrap it in wrapWithLogger() in the api.ts file, it works correctly, since wrapWithLogger logs the function name.
export const createDeleteMessage = (telegramBot: TelegramBot) => {
  return async function deleteTelegramMessageWithDelay({
    messageId,
    chatId,
    delay = DELETE_AFTER_MS
  }: DeleteTelegramMessageWithDelay) {
    await new Promise((resolve) => setTimeout(resolve, delay));

    return await telegramBot.deleteMessage(chatId, messageId);
  };
};
