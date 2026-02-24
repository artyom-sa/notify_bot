import 'dotenv/config';
import { requireEnv } from './config/env.ts';
import { createDiscordClient } from './discord/index.ts';
import { registerDiscordListeners } from './discord/listeners/index.ts';
import { createTelegramApi } from './telegram/api/api.ts';
import { createTelegramBot } from './telegram/index.ts';
import { registerTelegramListeners } from './telegram/listeners/index.ts';

const telegramBot = createTelegramBot();
const discordClient = createDiscordClient();

const telegramApi = createTelegramApi(telegramBot);

registerTelegramListeners(telegramBot, telegramApi);
registerDiscordListeners(discordClient, telegramApi);

discordClient.login(requireEnv('DISCORD_TOKEN'));
