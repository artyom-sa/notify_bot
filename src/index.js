import 'dotenv/config';
import { Client, GatewayIntentBits } from 'discord.js';
import fetch from 'node-fetch';
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.CHAT_ID;
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMembers
    ]
});
client.once('ready', () => {
    console.log(`🤖 Бот запущен как ${client.user?.tag}`);
});
client.on('voiceStateUpdate', async (oldState, newState) => {
    if (!oldState.channel && newState.channel) {
        const member = newState.member;
        if (!member)
            return;
        const channel = newState.channel;
        console.log(`[INFO] ${member.user.username} вошёл в ${channel.name}`);
        const members = channel.members.map((m) => m.user.username);
        let text = `🎙️ В *${channel.name}* зашёл *${member.user.username}*\n\n`;
        text += `Сейчас в канале:\n`;
        for (const name of members) {
            text +=
                name === member.user.username
                    ? `➡️ ${name} (зашёл)\n`
                    : `- ${name}\n`;
        }
        await sendTelegram(text);
    }
});
async function sendTelegram(text) {
    const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            text,
            parse_mode: 'Markdown'
        })
    });
    const data = await res.json();
    console.log('[TELEGRAM]', JSON.stringify(data, null, 2));
}
client.login(DISCORD_TOKEN);
