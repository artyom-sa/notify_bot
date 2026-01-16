import { MESSAGE_RECEIVER } from '../constants/baseConstants.ts';

export type TelegramApiResponse<T> = {
  ok: boolean;
  result: T;
};

export type MessageReceiver =
  (typeof MESSAGE_RECEIVER)[keyof typeof MESSAGE_RECEIVER];
