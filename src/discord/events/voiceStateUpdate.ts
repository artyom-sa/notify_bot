import { VoiceState } from 'discord.js';
import { requireEnv } from '../../config/env.ts';
import type { TelegramApi } from '../../telegram/api/api.ts';
import { getRandomEmoji } from '../../utils/getRandomEmoji.ts';
import { getRandomGreeting } from '../../utils/getRandomGreeting.ts';

const GROUP_CHAT_ID = Number(requireEnv('GROUP_CHAT_ID'));

// сообщения join по каналам
const channelMessages: number[] = [];

const joinedVoiceChannelHandler = async (
  newState: VoiceState,
  telegramApi: TelegramApi
) => {
  const newMember = newState.member;
  if (!newMember) return;

  const channel = newState.channel;
  if (!channel) return;

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
    text += `<b>${name} ${getRandomEmoji()}</b>\n`;
  }

  const { message_id } = await telegramApi.sendTelegramMessage({
    chatId: GROUP_CHAT_ID,
    text
  });

  channelMessages.push(message_id);
};

const leftVoiceChannelHandler = async (
  oldState: VoiceState,
  telegramApi: TelegramApi
) => {
  const channel = oldState.channel;
  if (!channel) return;

  // empty members on channel
  if (channel.members.size === 0) {
    const text =
      `📢 Канал <b>${channel.name}</b> опустел\n\n` +
      `Последний участник покинул голосовой канал 😢`;

    await telegramApi.sendTelegramMessage({
      chatId: GROUP_CHAT_ID,
      text
    });

    for await (const messageId of channelMessages) {
      await telegramApi.deleteTelegramMessageWithDelay({
        chatId: GROUP_CHAT_ID,
        messageId: messageId,
        delay: 0
      });
    }
  }
};

export const voiceStateUpdateEvent = async (
  oldState: VoiceState,
  newState: VoiceState,
  telegramApi: TelegramApi
) => {
  // entering the channel
  const joinedVoiceChannel = !oldState.channelId && newState.channelId;

  if (joinedVoiceChannel) {
    joinedVoiceChannelHandler(newState, telegramApi);
    return;
  }

  // leaving the channel
  const leftVoiceChannel = oldState.channelId && !newState.channelId;

  if (leftVoiceChannel) {
    leftVoiceChannelHandler(oldState, telegramApi);
  }
};
