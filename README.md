# Discord → Telegram Voice Notifier

Listens to Discord voice channels and sends Telegram notifications when someone joins — and when a channel becomes empty.

## How it works

```
Discord voiceStateUpdate
  → join / empty-channel logic
  → Telegram HTML message to GROUP_CHAT_ID
```

On startup the bot also posts a short notice to `PRIVATE_CHAT_ID`.

## Stack

- Node.js + TypeScript
- discord.js
- node-telegram-bot-api

## Setup

```bash
npm install
cp .env.example .env
```

Fill in:

| Variable         | Purpose                                      |
| ---------------- | -------------------------------------------- |
| `DISCORD_TOKEN`  | Discord bot token                            |
| `TELEGRAM_TOKEN` | Telegram bot token                           |
| `GROUP_CHAT_ID`  | Telegram chat for voice notifications        |
| `PRIVATE_CHAT_ID`| Telegram chat for the startup notice         |
| `NODE_ENV`       | `development` or `production`                |

In the Discord Developer Portal enable **Server Members Intent**.

## Scripts

```bash
npm run dev          # hot reload
npm start            # production
npm run check-types  # tsc
npm test             # vitest
```

## Layout

```
src/
  index.ts           composition root
  config.ts          env
  logger.ts
  telegram.ts        outbound Telegram client
  discord.ts         Discord client + event wiring
  voice/             join/leave notify logic + tests
  greeting/          playful join greetings
```
