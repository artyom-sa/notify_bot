import 'dotenv/config';
import { VoiceState } from 'discord.js';
import { sendTelegramMessage } from './httpApi/sendTelegramMessage.ts';
import discordClient from './client.ts';
import { logger } from './utils/logger.ts';
import { getRandomGreeting } from './utils/getRandomGreeting.ts';
import { getRandomEmoji } from './utils/getRandomEmoji.ts';

discordClient.once('ready', async (client) => {
  await client.guilds.fetch();

  const guild = client.guilds.cache.first();

  if (!guild) return;

  logger(
    'info',
    `[🤖 Бот запущен на сервере ${guild.name} как ${client.user?.username}]`
  );
});

discordClient.on(
  'voiceStateUpdate',
  async (oldState: VoiceState, newState: VoiceState) => {
    if (!oldState.channel && newState.channel) {
      const newMember = newState.member;
      if (!newMember) return;

      const joinedVoiceChannel = !oldState.channelId && newState.channelId;

      if (!joinedVoiceChannel) return;

      const channel = newState.channel;
      const members = channel.members.map(
        (member) => member.nickname || member.user.globalName
      );

      let text = `Уважаемая вафлебаза! Присоединяйтесь в канал <b>${
        channel.name
      }</b>\n\n<b>${
        newMember.nickname || newMember.user.globalName
      }</b> ${getRandomGreeting()}\n\n`;

      text += `Сейчас в канале:\n`;

      for (const name of members) {
        text += `<b>${name} ${getRandomEmoji()}</b>`;
      }

      await sendTelegramMessage(text);
    }
  }
);

discordClient.on('error', async (error) => {
  logger('error', `[🤖 Ошибка бота: ${JSON.stringify(error, null, 2)}]`);

  await sendTelegramMessage(
    `🤖 Ошибка бота: ${JSON.stringify(error, null, 2)}`
  );
});

discordClient.login(process.env.DISCORD_TOKEN!);
