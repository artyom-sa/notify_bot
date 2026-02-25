import Groq from 'groq-sdk';
import { requireEnv } from '../../config/env.ts';
import {
  BOT_TELEGRAM_USERNAME,
  GROK_MODEL,
  GROK_PRESET_DEFAULT
} from '../../constants/mentions.ts';
import type { CommandHandlerArgs } from '../../types.ts';
import { logger } from '../../utils/logger.ts';

const groq = new Groq({
  apiKey: requireEnv('GROK_API_KEY')
});

export const askCommand = async ({ api, msg }: CommandHandlerArgs) => {
  try {
    if (!msg.text) return;

    const trimmedText = msg.text.trim().toLowerCase();

    const userPrompt = trimmedText.replace(BOT_TELEGRAM_USERNAME, '').trim();

    const chatCompletion = await groq.chat.completions.create({
      model: GROK_MODEL,
      messages: [
        {
          role: 'system',
          content: GROK_PRESET_DEFAULT
        },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7
    });

    api.sendTelegramMessage({
      text: chatCompletion.choices[0].message.content,
      chatId: msg.chat.id
    });
  } catch (e) {
    logger('error', e);

    api.sendTelegramMessage({
      text: 'Не удалось найти ответ 🤡',
      chatId: msg.chat.id
    });
  }
};
