import type { CommandHandlerArgs } from '../../types.ts';
import { isAdmin } from '../../utils/isAdmin.ts';

export async function clearCommand({
  bot,
  api,
  msg,
  match
}: CommandHandlerArgs) {
  const chatId = msg.chat.id;
  const userId = msg.from?.id;

  if (!userId) return;

  // Только группы
  if (msg.chat.type !== 'group' && msg.chat.type !== 'supergroup') {
    return api.sendTelegramMessage({
      chatId,
      text: '❌ Эта команда работает только в группах'
    });
  }

  // Только админы
  if (!(await isAdmin(bot, chatId, userId))) {
    return api.sendTelegramMessage({
      chatId,
      text: '🚫 Требуются права администратора'
    });
  }

  // include command message from user
  const count = Number(match?.[1] ?? 10);

  // may be gaps between messages due to pinned or deletedCount messages
  let messageId = msg.message_id;
  let deletedCount = 0;

  while (deletedCount < count + 1 && messageId > 0) {
    const result = await api.deleteTelegramMessageWithDelay({
      chatId,
      messageId: messageId,
      delay: 0
    });

    if (result) {
      deletedCount++;
    }
    messageId--;
  }

  const info = await api.sendTelegramMessage({
    chatId,
    text: `Очищено ${count} сообщений 🧹`
  });

  // Удаляем уведомление через 3 сек
  await api.deleteTelegramMessageWithDelay({
    chatId,
    messageId: info.message_id,
    delay: 5000
  });
}
