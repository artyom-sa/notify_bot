import TelegramBot from 'node-telegram-bot-api';
import { log } from './logger.ts';

export type TelegramClient = {
  sendHtml(chatId: number, text: string): Promise<number>;
  deleteMessage(chatId: number, messageId: number): Promise<void>;
  getChatTitle(chatId: number): Promise<string>;
  sendTemporary(chatId: number, text: string, ttlMs?: number): Promise<void>;
};

export function createTelegramClient(token: string): TelegramClient {
  const bot = new TelegramBot(token, { polling: false });

  return {
    async sendHtml(chatId, text) {
      const message = await bot.sendMessage(chatId, text, {
        parse_mode: 'HTML'
      });
      return message.message_id;
    },

    async deleteMessage(chatId, messageId) {
      try {
        await bot.deleteMessage(chatId, messageId);
      } catch (error) {
        log.warn(`Failed to delete message ${messageId}: ${String(error)}`);
      }
    },

    async getChatTitle(chatId) {
      const chat = await bot.getChat(chatId);
      return chat.title ?? chat.username ?? String(chatId);
    },

    async sendTemporary(chatId, text, ttlMs = 5000) {
      const message = await bot.sendMessage(chatId, text);
      setTimeout(() => {
        bot.deleteMessage(chatId, message.message_id).catch(() => undefined);
      }, ttlMs);
    }
  };
}
