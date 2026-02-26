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

    if (!userPrompt) {
      return await telegramApi.sendTelegramMessage({
        text: `Если тэгаешь и хочешь поболтать:\n\n<pre><code>${BOT_TELEGRAM_USERNAME} {ваш вопрос}</code></pre>\n\nИначе не тэгай 🙄`,
        chatId: msg.chat.id
      });
    }

    const answer = await getGroqAnswer({ userPrompt, rude: true });

    telegramApi.sendTelegramMessage({
      text: answer,
      chatId: msg.chat.id
    });
  });
}
