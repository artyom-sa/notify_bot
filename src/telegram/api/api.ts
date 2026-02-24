import type TelegramBot from 'node-telegram-bot-api';
import { wrapWithLogger } from '../../utils/wrapWithLogger.ts';
import { createDeleteMessage } from './createDeleteMessage.ts';
import { createGetChat } from './createGetChat.ts';
import { createSendMessage } from './createSendMessage.ts';
import { createSendMessageWithCleanup } from './createSendMessageWithCleanup.ts';
import { createSendPhoto } from './createSendPhoto.ts';

export const createTelegramApi = (bot: TelegramBot) => ({
  deleteTelegramMessageWithDelay: wrapWithLogger(createDeleteMessage(bot)),
  sendTelegramMessage: wrapWithLogger(createSendMessage(bot)),
  sendMessageWithCleanup: wrapWithLogger(createSendMessageWithCleanup(bot)),
  sendPhoto: wrapWithLogger(createSendPhoto(bot)),
  getChat: wrapWithLogger(createGetChat(bot))
});

export type TelegramApi = ReturnType<typeof createTelegramApi>;
