import fetch from 'node-fetch';
import { SendMessageResponse } from '../types/sendMessage';
import { DeleteMessageResponse } from '../types';
import { logger } from './logger';
import { BASE_TELEGRAM_URL, DELETE_AFTER_MS } from '../constants';

const sendMessage = async (text: string): Promise<SendMessageResponse> => {
  console.log(text);
  const res = await fetch(`${BASE_TELEGRAM_URL}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: process.env.CHAT_ID!,
      text
    })
  });

  return (await res.json()) as SendMessageResponse;
};

const deleteMessage = async (
  messageId: number
): Promise<DeleteMessageResponse> => {
  const res = await fetch(`${BASE_TELEGRAM_URL}/deleteMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: process.env.CHAT_ID!,
      message_id: messageId
    })
  });

  return (await res.json()) as DeleteMessageResponse;
};

export const sendTelegramMessage = async (text: string) => {
  try {
    const sendMessageData = await sendMessage(text);

    logger(
      'info',
      '[TELEGRAM SEND MESSAGE RESPONSE]',
      JSON.stringify(sendMessageData, null, 2)
    );

    const messageId = sendMessageData.result.message_id;

    setTimeout(async () => {
      try {
        const deleteMessageData = deleteMessage(messageId);

        logger(
          'info',
          '[TELEGRAM DELETE MESSAGE SUCCESS]',
          JSON.stringify(deleteMessageData, null, 2)
        );
      } catch (err) {
        logger(
          'error',
          '[TELEGRAM DELETE MESSAGEERROR]',
          JSON.stringify(err, null, 2)
        );
      }
    }, DELETE_AFTER_MS);
  } catch {
    logger(
      'error',
      '[TELEGRAM SEND MESSAGE ERROR] Не удалось отправить сообщение в Telegram'
    );
  }
};
