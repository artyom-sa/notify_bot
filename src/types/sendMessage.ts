import { TelegramApiResponse } from './baseTypes.ts';

interface Message {
  message_id: number;
  date: number;
  chat: Chat;
  text?: string;

  from?: User;
  sender_chat?: Chat;

  entities?: MessageEntity[];
  reply_to_message?: Message;
}

interface Chat {
  id: number;
  type: 'private' | 'group' | 'supergroup' | 'channel';

  title?: string;
  username?: string;
  first_name?: string;
  last_name?: string;
}

interface User {
  id: number;
  is_bot: boolean;
  first_name: string;

  last_name?: string;
  username?: string;
  language_code?: string;
}

interface MessageEntity {
  type:
    | 'mention'
    | 'hashtag'
    | 'bot_command'
    | 'url'
    | 'email'
    | 'bold'
    | 'italic'
    | 'underline'
    | 'strikethrough'
    | 'code'
    | 'pre'
    | 'text_link'
    | 'text_mention';

  offset: number;
  length: number;

  url?: string;
  user?: User;
  language?: string;
}

export type SendMessageResponse = TelegramApiResponse<Message>;
