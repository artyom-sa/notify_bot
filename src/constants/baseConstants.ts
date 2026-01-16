export const BASE_TELEGRAM_URL = `${process.env.TELEGRAM_API}/bot${process.env
  .TELEGRAM_TOKEN!}`;

export const MESSAGE_RECEIVER = {
  Private: 'private',
  Group: 'group'
} as const;
