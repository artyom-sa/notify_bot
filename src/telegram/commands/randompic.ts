import puppeteer from 'puppeteer';
import type { CommandHandlerArgs } from '../../types.ts';

export async function randomPicCommand({
  api,
  msg,
  match
}: CommandHandlerArgs) {
  const chatId = msg.chat.id;

  const query = match[1] ? match[1].trim() : 'random pics';

  try {
    await api.deleteTelegramMessageWithDelay({
      messageId: msg.message_id,
      chatId,
      delay: 0
    });

    const sendMessageResponse = await api.sendTelegramMessage({
      chatId,
      text: `Ищу изображение на тему ${query} 🤔`
    });

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(`https://www.pinterest.com/search/pins/?q=${query}`, {
      waitUntil: 'networkidle2'
    });

    // imitate scroll
    for (let i = 0; i < 5; i++) {
      await page.evaluate(() => {
        window.scrollBy(0, window.innerHeight);
      });
      await new Promise((r) => setTimeout(r, 1200));
    }

    const images = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('img'))
        .map((img) => img.srcset)
        .filter((src) => src && src.includes('pinimg'));
    });

    if (!images) {
      await api.sendTelegramMessage({
        chatId,
        text: 'Не удалось найти изображения 🤡'
      });
    }

    await browser.close();

    console.log({ images });

    const randomImage =
      images[Math.floor(Math.random() * Math.max(images.length - 1, 0))];

    const url = randomImage.split(',')[3].trim().split(' ')[0];

    await api.sendPhoto({
      chatId,
      img: url,
      text: `Нашел изображение на тему ${query} 🤓`
    });

    await api.deleteTelegramMessageWithDelay({
      messageId: sendMessageResponse.message_id,
      chatId,
      delay: 0
    });
  } catch {
    await api.sendTelegramMessage({
      chatId,
      text: 'Не удалось отправить изображение 🤡'
    });
  }
}
