import puppeteer from 'puppeteer';

export const getPinterestPicture = async (query: string) => {
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

  await browser.close();

  if (!images || !images.length) {
    return;
  }

  const randomImage =
    images[Math.floor(Math.random() * Math.max(images.length - 1, 0))];

  const imageUrl = randomImage.split(',')[3].trim().split(' ')[0];

  return imageUrl;
};
