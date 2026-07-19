import { Client, GatewayIntentBits, type VoiceState } from 'discord.js';
import { log } from './logger.ts';
import type { TelegramClient } from './telegram.ts';
import { createVoiceNotifyHandler } from './voice/notify.ts';

type DiscordBotOptions = {
  token: string;
  groupChatId: number;
  privateChatId: number;
  telegram: TelegramClient;
};

export function createDiscordBot({
  token,
  groupChatId,
  privateChatId,
  telegram
}: DiscordBotOptions) {
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildVoiceStates,
      GatewayIntentBits.GuildMembers
    ]
  });

  const handleVoiceState = createVoiceNotifyHandler({
    send: (text) => telegram.sendHtml(groupChatId, text),
    delete: (messageId) => telegram.deleteMessage(groupChatId, messageId)
  });

  client.once('clientReady', async (readyClient) => {
    await readyClient.guilds.fetch();
    const guild = readyClient.guilds.cache.first();
    if (!guild) {
      log.warn('Bot is ready but no guilds are available');
      return;
    }

    const botName = readyClient.user.username;
    log.info(`Started on Discord server "${guild.name}" as ${botName}`);

    try {
      const chatTitle = await telegram.getChatTitle(groupChatId);
      await telegram.sendTemporary(
        privateChatId,
        `🤖 Бот запущен на сервере ${guild.name} как ${botName}, уведомления о голосовых каналах будут в чат — "${chatTitle}"`
      );
    } catch (error) {
      log.error('Failed to send startup Telegram notice', error);
    }
  });

  client.on(
    'voiceStateUpdate',
    async (oldState: VoiceState, newState: VoiceState) => {
      try {
        await handleVoiceState(oldState, newState);
      } catch (error) {
        log.error('voiceStateUpdate handler failed', error);
      }
    }
  );

  client.on('error', (error) => {
    log.error('Discord client error', error);
  });

  return {
    start: () => client.login(token),
    stop: () => client.destroy()
  };
}
