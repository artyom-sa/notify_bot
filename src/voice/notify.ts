import type { VoiceState } from 'discord.js';
import { formatEmptyChannelMessage, formatJoinMessage } from './messages.ts';

export type VoiceNotifier = {
  send(text: string): Promise<number>;
  delete(messageId: number): Promise<void>;
};

function memberDisplayName(member: {
  nickname: string | null;
  user: { globalName: string | null; username: string };
}): string {
  return member.nickname || member.user.globalName || member.user.username;
}

/**
 * Tracks Discord voice join/leave and pushes Telegram notifications.
 * Message IDs are kept per channel so join spam can be cleaned when a channel empties.
 */
export function createVoiceNotifyHandler(notifierTelegram: VoiceNotifier) {
  const joinMessageIdsByChannel = new Map<string, number[]>();

  const onJoin = async (state: VoiceState) => {
    const member = state.member;
    const channel = state.channel;
    if (!member || !channel) return;

    const memberNames = Array.from(channel.members.values()).map(
      memberDisplayName
    );

    const text = formatJoinMessage({
      channelName: channel.name,
      joinerName: memberDisplayName(member),
      memberNames
    });

    const messageId = await notifierTelegram.send(text);
    const existing = joinMessageIdsByChannel.get(channel.id) ?? [];
    existing.push(messageId);
    joinMessageIdsByChannel.set(channel.id, existing);
  };

  const onLeave = async (state: VoiceState) => {
    const channel = state.channel;
    if (!channel || channel.members.size > 0) return;

    await notifierTelegram.send(formatEmptyChannelMessage(channel.name));

    const messageIds = joinMessageIdsByChannel.get(channel.id) ?? [];
    for (const messageId of messageIds) {
      await notifierTelegram.delete(messageId);
    }
    joinMessageIdsByChannel.delete(channel.id);
  };

  return async (oldState: VoiceState, newState: VoiceState) => {
    const joined = !oldState.channelId && Boolean(newState.channelId);
    if (joined) {
      await onJoin(newState);
      return;
    }

    const left = Boolean(oldState.channelId) && !newState.channelId;
    if (left) {
      await onLeave(oldState);
    }
  };
}
