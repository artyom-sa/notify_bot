import { MESSAGE_RECEIVER } from '../constants/baseConstants.ts';
import { HTTP_API } from './httpApi.ts';
import { deleteTelegramMessageWithDelay } from './deleteTelegramMessageWithDelay.ts';
import type { MessageReceiver } from '../types/baseTypes.ts';
import { logger } from '../utils/logger.ts';

export const sendTelegramMessage = async (
  text: string,
  receiver: MessageReceiver = MESSAGE_RECEIVER.Private
) => {
  try {
    const sendMessageData = await HTTP_API.sendMessage(text, receiver);

    logger(
      'help',
      '[TELEGRAM SEND MESSAGE RESPONSE]',
      JSON.stringify(sendMessageData, null, 2)
    );

    const messageId = sendMessageData.result.message_id;

    deleteTelegramMessageWithDelay(messageId, receiver);

    return sendMessageData;
  } catch {
    logger(
      'error',
      '[TELEGRAM SEND MESSAGE ERROR] Не удалось отправить сообщение в Telegram'
    );
  }
};
