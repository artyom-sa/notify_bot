import { Client } from 'discord.js';
import { requireEnv } from '../../config/env.ts';
import type { TelegramApi } from '../../telegram/api/api.ts';
import { logger } from '../../utils/logger.ts';

const PRIVATE_CHAT_ID = Number(requireEnv('PRIVATE_CHAT_ID'));
const GROUP_CHAT_ID = Number(requireEnv('GROUP_CHAT_ID'));

export const readyEvent = async (
  client: Client<true>,
  telegramApi: TelegramApi
) => {
  await client.guilds.fetch();

  const guild = client.guilds.cache.first();

  if (!guild) return;

  logger(
    'info',
    `[🤖 Бот запущен на сервере Discord ${guild.name} как ${client.user?.username}]`
  );

  const chat = await telegramApi.getChat({ chatId: GROUP_CHAT_ID });

  await telegramApi.sendMessageWithCleanup({
    text: `🤖 Бот запущен на сервере ${guild.name} как ${client.user?.username}, уведомления о изменении количества участников канала будут отправляться в чат - "${chat.title}"`,
    chatId: PRIVATE_CHAT_ID
  });
};
