import { COMMANDS_LIST } from '../../constants/commands.ts';
import type { CommandHandlerArgs } from '../../types.ts';

export async function helpCommand({ api, msg }: CommandHandlerArgs) {
  const chatId = msg.chat.id;

  await api.deleteTelegramMessageWithDelay({
    messageId: msg.message_id,
    chatId,
    delay: 0
  });

  let text = '🤖 Доступные команды:\n\n';

  COMMANDS_LIST.forEach(({ description, command }) => {
    text += `/${command} - ${description}\n`;
  });

  await api.sendTelegramMessage({
    chatId,
    text
  });
}
