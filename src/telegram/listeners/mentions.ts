import Groq from 'groq-sdk';
import type TelegramBot from 'node-telegram-bot-api';
import { requireEnv } from '../../config/env.ts';
import {
  BOT_TELEGRAM_USERNAME,
  GROK_MODEL,
  GROK_PRESET
} from '../../constants/mentions.ts';
import type { TelegramApi } from '../api/api.ts';

const groq = new Groq({
  apiKey: requireEnv('GROK_API_KEY')
});

export function registerMentionListeners(
  bot: TelegramBot,
  telegramApi: TelegramApi
) {
  bot.on('message', async (msg) => {
    if (!msg.text) return;

    const trimmedText = msg.text.trim().toLowerCase();

    const isIncludesMention = trimmedText.includes(BOT_TELEGRAM_USERNAME);

    const userPrompt = trimmedText.replace(BOT_TELEGRAM_USERNAME, '').trim();

    if (!isIncludesMention) return;

    const chatCompletion = await groq.chat.completions.create({
      model: GROK_MODEL,
      messages: [
        {
          role: 'system',
          content: GROK_PRESET
        },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7
    });

    telegramApi.sendTelegramMessage({
      text: chatCompletion.choices[0].message.content,
      chatId: msg.chat.id
    });
  });
}
