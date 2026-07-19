import { config } from './config.ts';
import { createDiscordBot } from './discord.ts';
import { log } from './logger.ts';
import { createTelegramClient } from './telegram.ts';

const telegram = createTelegramClient(config.telegramToken);

const discord = createDiscordBot({
  token: config.discordToken,
  groupChatId: config.groupChatId,
  privateChatId: config.privateChatId,
  telegram
});

const shutdown = async () => {
  log.info('Shutting down…');
  await discord.stop();
};

process.once('SIGINT', () => {
  shutdown().finally(() => process.exit(0));
});

process.once('SIGTERM', () => {
  shutdown().finally(() => process.exit(0));
});

await discord.start();
log.info('Discord login initiated');
