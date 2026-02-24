import { Client, VoiceState } from 'discord.js';
import type { TelegramApi } from '../../telegram/api/api.ts';
import { errorEvent } from '../events/error.ts';
import { readyEvent } from '../events/readyEvent.ts';
import { voiceStateUpdateEvent } from '../events/voiceStateUpdate.ts';

export function registerDiscordListeners(
  client: Client,
  telegramApi: TelegramApi
) {
  client.once('ready', (client) => readyEvent(client, telegramApi));

  client.on(
    'voiceStateUpdate',
    async (oldState: VoiceState, newState: VoiceState) =>
      voiceStateUpdateEvent(oldState, newState, telegramApi)
  );

  client.on('error', async (error) => errorEvent(error));
}
