import type { CommandHandlerArgs } from '../../types.ts';

export async function pingCommand({ api, msg }: CommandHandlerArgs) {
  await api.deleteTelegramMessageWithDelay({
    messageId: msg.message_id,
    chatId: msg.chat.id,
    delay: 0
  });

  const sendMessageResponse = await api.sendTelegramMessage({
    chatId: msg.chat.id,
    text: '🏓 Понг!'
  });

  await api.deleteTelegramMessageWithDelay({
    messageId: sendMessageResponse.message_id,
    chatId: sendMessageResponse.chat.id,
    delay: 5000
  });
}
