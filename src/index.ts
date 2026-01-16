import 'dotenv/config';
import { VoiceState } from 'discord.js';
import { sendTelegramMessage } from './utils/sendTelegramMessage.ts';
import discordClient from './client';

const DISCORD_TOKEN = process.env.DISCORD_TOKEN!;

discordClient.once('ready', () => {
  console.log(`🤖 Бот запущен как ${discordClient.user?.tag}`);
  sendTelegramMessage(`🤖 Бот запущен как ${discordClient.user?.tag}`);
});

discordClient.on(
  'voiceStateUpdate',
  async (oldState: VoiceState, newState: VoiceState) => {
    if (!oldState.channel && newState.channel) {
      const member = newState.member;
      if (!member) return;

      const channel = newState.channel;
      console.log(`[INFO] ${member.user.username} вошёл в ${channel.name}`);

      const members = channel.members.map((m) => m.user.username);

      let text = `🎙️ В *${channel.name}* зашёл *${member.user.username}*\n\n`;
      text += `Сейчас в канале:\n`;

      for (const name of members) {
        text +=
          name === member.user.username
            ? `➡️ ${name} (зашёл)\n`
            : `- ${name}\n`;
      }

      await sendTelegramMessage(text);
    }
  }
);

discordClient.login(DISCORD_TOKEN);
