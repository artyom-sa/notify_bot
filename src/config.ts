import 'dotenv/config';

function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing env variable: ${name}`);
  }
  return value;
}

function requireNumberEnv(name: string): number {
  const value = Number(requireEnv(name));
  if (!Number.isFinite(value)) {
    throw new Error(`Invalid env variable: ${name}`);
  }
  return value;
}

export const config = {
  discordToken: requireEnv('DISCORD_TOKEN'),
  telegramToken: requireEnv('TELEGRAM_TOKEN'),
  groupChatId: requireNumberEnv('GROUP_CHAT_ID'),
  privateChatId: requireNumberEnv('PRIVATE_CHAT_ID'),
  isDevelopment: requireEnv('NODE_ENV') === 'development'
} as const;
