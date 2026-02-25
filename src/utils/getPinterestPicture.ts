import puppeteer from 'puppeteer';
import { getRandomNumber } from './getRandomDuration.ts';

export const getPinterestPicture = async (query: string) => {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--no-zygote',
      '--disable-gpu'
    ]
  });
  const page = await browser.newPage();

  await page.setUserAgent({
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });

  await page.goto(
    `https://www.pinterest.com/search/pins/?q=${encodeURIComponent(query)}&rs=typed`,
    {
      waitUntil: 'networkidle2'
    }
  );

  await page.waitForSelector('img[src*="pinimg"]', { timeout: 10000 });

  // imitate scroll
  for (let i = 0; i < 5; i++) {
    await page.evaluate(() => {
      window.scrollBy(0, 1200);
    });
    await new Promise((r) => setTimeout(r, getRandomNumber(1200) + 200));
  }

  const imageUrls = await page.evaluate(() => {
    const urls = new Set<string>();

    document
      .querySelectorAll('img[src*="pinimg"]')
      .forEach((img: HTMLImageElement) => {
        if (img.srcset) {
          const srcSets = img.srcset.split(',');
          const url = srcSets[srcSets.length - 1].trim().split(' ')[0];

          if (url.includes('pinimg.com')) {
            const cleanUrl = url.split('?')[0];
            urls.add(cleanUrl);
          }
        }
      });

    return Array.from(urls);
  });

  await browser.close();

  if (!imageUrls || !imageUrls.length) {
    return;
  }

  return imageUrls[
    Math.floor(Math.random() * Math.max(imageUrls.length - 1, 0))
  ];
};
