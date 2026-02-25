import type TelegramBot from 'node-telegram-bot-api';
import { BOT_TELEGRAM_USERNAME } from '../../constants/mentions.ts';
import { getGroqAnswer } from '../../utils/getGroqAnswer.ts';
import type { TelegramApi } from '../api/api.ts';

export function registerMentionListeners(
  bot: TelegramBot,
  telegramApi: TelegramApi
) {
  bot.on('message', async (msg) => {
    if (!msg.text) return;

    const trimmedText = msg.text.trim().toLowerCase();

    const isStartsWithMention = trimmedText.startsWith(BOT_TELEGRAM_USERNAME);

    const userPrompt = trimmedText.replace(BOT_TELEGRAM_USERNAME, '').trim();

    if (!isStartsWithMention) return;

    const answer = await getGroqAnswer(userPrompt);

    telegramApi.sendTelegramMessage({
      text: answer,
      chatId: msg.chat.id
    });
  });
}
