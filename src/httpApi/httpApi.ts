import {
  BASE_TELEGRAM_URL,
  MESSAGE_RECEIVER
} from '../constants/baseConstants.ts';
import fetch from 'node-fetch';
import type { MessageReceiver } from '../types/baseTypes.ts';
import type {
  DeleteMessageResponse,
  SendMessageResponse
} from '../types/telegramResponses.ts';

export const HTTP_API = {
  sendMessage: async (
    text: string,
    receiver: MessageReceiver
  ): Promise<SendMessageResponse> => {
    const res = await fetch(`${BASE_TELEGRAM_URL}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id:
          receiver === MESSAGE_RECEIVER.Private
            ? process.env.PRIVATE_CHAT_ID
            : process.env.GROUP_CHAT_ID,
        text,
        parse_mode: 'HTML'
      })
    });

    return (await res.json()) as SendMessageResponse;
  },
  deleteMessage: async (
    messageId: number,
    receiver: MessageReceiver
  ): Promise<DeleteMessageResponse> => {
    const res = await fetch(`${BASE_TELEGRAM_URL}/deleteMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id:
          receiver === MESSAGE_RECEIVER.Private
            ? process.env.PRIVATE_CHAT_ID
            : process.env.GROUP_CHAT_ID,
        message_id: messageId
      })
    });

    return (await res.json()) as DeleteMessageResponse;
  }
};
