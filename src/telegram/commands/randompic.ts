import type { CommandHandlerArgs } from '../../types.ts';
import { getPinterestPicture } from '../../utils/getPinterestPicture.ts';
import { getRandomQueryForPinterest } from '../../utils/getRandomQueryForPinterest.ts';
import { logger } from '../../utils/logger.ts';

export async function randomPicCommand({
  api,
  msg,
  match
}: CommandHandlerArgs) {
  const chatId = msg.chat.id;

  const isProvidedUserQuery = match[1];

  const query = isProvidedUserQuery
    ? match[1].trim()
    : getRandomQueryForPinterest();

  try {
    await api.deleteTelegramMessageWithDelay({
      messageId: msg.message_id,
      chatId,
      delay: 0
    });

    const searchMessageResponse = await api.sendTelegramMessage({
      chatId,
      text: `Ищу изображение ${isProvidedUserQuery ? `на тему ${query}` : ''} 🤔`
    });

    const imageUrl = await getPinterestPicture(query);

    if (!imageUrl) {
      await api.sendTelegramMessage({
        chatId,
        text: 'Не удалось найти изображения 🤡'
      });
    }

    await api.sendPhoto({
      chatId,
      img: imageUrl,
      text: `Нашел изображение ${isProvidedUserQuery ? `на тему ${query}` : ''} 🤓`
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
      text: 'Не удалось отправить изображение 🤡'
    });
  }
}
