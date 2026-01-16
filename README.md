# 🤖 Simple Discord → Telegram Notification Bot

A simple and lightweight **Discord bot** built with **Node.js + TypeScript** that listens to Discord events (such as users joining voice channels) and sends notifications to **Telegram**.

This project is designed to be:

- easy to set up
- easy to extend
- friendly for open-source usage

---

# ✨ Features

- 🎧 Track users joining Discord voice channels
- 📩 Send notifications to Telegram (group or private chat)
- 🧩 Written in TypeScript
- ⚡ Lightweight and dependency-minimal
- 🛠 Easy local development with hot reload
- 🔌 Easy to extend with memes, media, analytics, etc.

---

# 🧰 Tech Stack

- **Node.js**
- **TypeScript**
- **Discord.js**
- **Telegram Bot API**
- **nodemon** (development)

---

# 📦 Available Scripts

The following scripts are available in `package.json`:

```json
{
  "start": "node ./src/index.ts",
  "dev": "nodemon ./src/index.ts",
  "check-types": "tsc --build"
}
```

---

# 🛠 Scripts overview

| Script        | Description                             |
| ------------- | --------------------------------------- |
| `start`       | Starts the bot in production mode       |
| `dev`         | Runs the bot locally with hot reload    |
| `check-types` | Runs TypeScript type checking and build |

---

# 🛠 Requirements

Before running the project, make sure you have:

- Node.js v25.2.1 or higher
- npm (comes with Node.js)
- A Discord bot token
- A Telegram bot token

---

# 📥 Installation

1. Clone the repository:

```bash
  git clone <repository-url>
  cd <project-folder>
```

2. Install dependencies:

```bash
  npm install
```

3. Create an environment file:

```bash
  cp .env.example .env
```

---

4. Fill in all required environment variables.

# ⚙️ Environment Variables

All configuration is done via environment variables.

## Discord

**DISCORD_TOKEN**

Token of your Discord bot.

You can get it from the Discord Developer Portal:
https://discord.com/developers/applications

**⚠️ Important:**

In the Discord Developer Portal, you must enable:

- Server Members Intent → true

Without this intent, the bot will not work correctly.

## Telegram

**TELEGRAM_TOKEN**

Token of your Telegram bot.
Obtain it by creating a bot via @BotFather in Telegram.

**GROUP_CHAT_ID**

ID of the Telegram group chat where notifications will be sent.

**PRIVATE_CHAT_ID**

ID of a private Telegram chat.
Useful for testing, debugging, or personal notifications.

---

# 🚀 Running the Bot

**Development Mode**

Runs the bot locally with automatic reload on file changes:

```bash
  npm run dev
```

**Type Checking and build**

To validate TypeScript types and build the project:

```bash
  npm run check-types
```

**Production Mode**

Starts the bot in production mode:

```bash
  npm run start
```

---

# 🧠 How It Works (High Level)

1. The bot connects to Discord using DISCORD_TOKEN

2. It listens to Discord events (e.g. voiceStateUpdate)

3. When a user joins a voice channel, the bot:

   - collects channel and user information

   - formats a message

   - sends it to Telegram using the Telegram Bot API

---

# 📄 License

This project is provided as-is and is free to use, modify, and distribute for personal or commercial purposes.
