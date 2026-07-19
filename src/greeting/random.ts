import { obsceneDictionary } from './dictionary.ts';

const pick = <T>(items: T[]): T =>
  items[Math.floor(Math.random() * items.length)]!;

const randomEmoji = (): string => {
  const min = 0x1f300;
  const max = 0x1faff;
  const codePoint = Math.floor(Math.random() * (max - min + 1)) + min;
  return String.fromCodePoint(codePoint);
};

export const randomGreeting = (): string => {
  const { adjectives, nouns, adverbsAndExpressions, verbs } = obsceneDictionary;
  return `${pick(adjectives)} ${pick(nouns)} пришел ${pick(adverbsAndExpressions)} ${pick(verbs)}  ${randomEmoji()}`;
};

export { randomEmoji };
