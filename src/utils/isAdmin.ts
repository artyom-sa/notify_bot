import type TelegramBot from 'node-telegram-bot-api';

export const isAdmin = async (
  bot: TelegramBot,
  chatId: number,
  userId: number
) => {
  const admins = await bot.getChatAdministrators(chatId);
  return admins.some((a) => a.user.id === userId);
};
