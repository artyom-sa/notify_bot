import type TelegramBot from 'node-telegram-bot-api';

type SendTelegramMessage = {
  text: string;
  chatId: number;
  delay?: number;
};

// It's made as a function that returns a function.
// Firstly: the function itself creates a new function from the Telegram API.
// Secondly: so that at the top level, when we wrap it in wrapWithLogger() in the api.ts file, it works correctly, since wrapWithLogger logs the function name.
export const createSendMessageWithCleanup = (telegramBot: TelegramBot) => {
  return async function sendTelegramMessageWithCleanup({
    text,
    chatId,
    delay = 5000
  }: SendTelegramMessage) {
    const sendMessageResult = await telegramBot.sendMessage(chatId, text);

    await new Promise((resolve) => setTimeout(resolve, delay));

    await telegramBot.deleteMessage(chatId, sendMessageResult.message_id);
  };
};
