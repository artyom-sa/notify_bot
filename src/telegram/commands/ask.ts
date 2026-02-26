import { BOT_TELEGRAM_USERNAME } from '../../constants/mentions.ts';
import type { CommandHandlerArgs } from '../../types.ts';
import { getGroqAnswer } from '../../utils/getGroqAnswer.ts';
import { logger } from '../../utils/logger.ts';

export const askCommand = async ({ api, msg }: CommandHandlerArgs) => {
  try {
    if (!msg.text) return;

    const trimmedText = msg.text.trim().toLowerCase();

    const userPrompt = trimmedText
      .replace('/ask', '')
      .replace(BOT_TELEGRAM_USERNAME, '')
      .trim();

    if (!userPrompt) {
      return await api.sendTelegramMessage({
        text: `После ввода команды задай вопрос 🤡\n\nВызов команды:\n<pre><code>/ask {вопрос}</code></pre>\nили\n<pre><code>/ask${BOT_TELEGRAM_USERNAME} {вопрос}</code></pre>`,
        chatId: msg.chat.id
      });
    }

    const answer = await getGroqAnswer({ userPrompt });

    await api.sendTelegramMessage({
      text: answer,
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
