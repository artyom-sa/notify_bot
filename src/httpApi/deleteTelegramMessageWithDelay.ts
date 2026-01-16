import type { MessageReceiver } from '../types/baseTypes.ts';
import { logger } from '../utils/logger.ts';
import { HTTP_API } from './httpApi.ts';

const DELETE_AFTER_MS = 1 * 20 * 1000; // 5 seconds

export const deleteTelegramMessageWithDelay = async (
  messageId: number,
  receiver: MessageReceiver
) => {
  setTimeout(async () => {
    try {
      const deleteMessageData = await HTTP_API.deleteMessage(
        messageId,
        receiver
      );

      logger(
        'help',
        '[TELEGRAM DELETE MESSAGE SUCCESS]',
        JSON.stringify(deleteMessageData, null, 2)
      );

      return deleteMessageData;
    } catch (err) {
      logger(
        'error',
        '[TELEGRAM DELETE MESSAGEERROR]',
        JSON.stringify(err, null, 2)
      );
    }
  }, DELETE_AFTER_MS);
};
