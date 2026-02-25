import { getRandomNumber } from './getRandomDuration.ts';
import { getRandomValueFromArray } from './getRandomValueFromArray.ts';

const target = ['mem', 'meme', 'joke', 'rofl', 'monkey'];

const adjectives = [
  'funny',
  'small',
  'obscene',
  'dirty',
  'ridiculous',
  'absurd',
  'amazing',
  'ultra'
];

export const getRandomQueryForPinterest = () => {
  return `${getRandomValueFromArray(adjectives)} ${getRandomValueFromArray(target)} ${getRandomNumber(100)}`;
};
