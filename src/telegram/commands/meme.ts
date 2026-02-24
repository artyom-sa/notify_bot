import { apiLeagueInstance } from '../../http/apiLeague.ts';
import type { CommandHandlerArgs } from '../../types.ts';

export async function memeCommand({ api, msg }: CommandHandlerArgs) {
  const chatId = msg.chat.id;

  try {
    await api.deleteTelegramMessageWithDelay({
      messageId: msg.message_id,
      chatId,
      delay: 0
    });

    const sendMessageResponse = await api.sendTelegramMessage({
      chatId,
      text: `Ищу мем 🤔`
    });

    const apiLeagueResponse = await apiLeagueInstance.get(
      '/retrieve-random-meme',
      {
        params: {
          minRating: 1,
          maxAgeDays: 5
        }
      }
    );

    const requestCountLeft = apiLeagueResponse.headers['x-api-quota-left'];
    const requestCountUsed = apiLeagueResponse.headers['x-api-quota-used'];

    const memeDescription = apiLeagueResponse.data.description;
    const memUrl = apiLeagueResponse.data.url;

    const text = `🐸 Описание мема: ${memeDescription}\n\nОсталось мемов на сегодня ${requestCountLeft}\nИспользовано мемов ${requestCountUsed}`;

    await api.sendPhoto({
      chatId,
      img: memUrl,
      text: text
    });

    await api.deleteTelegramMessageWithDelay({
      messageId: sendMessageResponse.message_id,
      chatId,
      delay: 0
    });
  } catch {
    await api.sendTelegramMessage({
      chatId,
      text: 'Не удалось отправить мем 🤡'
    });
  }
}
