import type { CommandHandlerArgs } from '../../types.ts';
import { getApiLeagueMeme } from '../../utils/getApiLeagueMeme.ts';
import { logger } from '../../utils/logger.ts';

export async function memeCommand({ api, msg }: CommandHandlerArgs) {
  const chatId = msg.chat.id;

  try {
    await api.deleteTelegramMessageWithDelay({
      messageId: msg.message_id,
      chatId,
      delay: 0
    });

    const searchMessageResponse = await api.sendTelegramMessage({
      chatId,
      text: `Ищу мем 🤔`
    });

    const { memeUrl, text } = await getApiLeagueMeme();

    if (!memeUrl) {
      return await api.sendTelegramMessage({
        chatId,
        text: 'Не удалось найти мем 🤡'
      });
    }

    await api.sendPhoto({
      chatId,
      img: memeUrl,
      text: text
    });

    await api.deleteTelegramMessageWithDelay({
      messageId: searchMessageResponse.message_id,
      chatId,
      delay: 0
    });
  } catch (e) {
    logger('error', e);

    await api.sendTelegramMessage({
      chatId,
      text: 'Не удалось отправить мем 🤡'
    });
  }
}
