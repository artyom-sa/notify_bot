import { obsceneDictionary } from '../constants/obsceneDictionary.ts';
import { getRandomValueFromArray } from './getRandomValueFromArray.ts';
import { getRandomEmoji } from './getRandomEmoji.ts';

export const getRandomGreeting = () => {
  const adjective = getRandomValueFromArray(obsceneDictionary.adjectives);
  const noun = getRandomValueFromArray(obsceneDictionary.nouns);
  const adverbsAndExpressions = getRandomValueFromArray(
    obsceneDictionary.adverbsAndExpressions
  );
  const verbs = getRandomValueFromArray(obsceneDictionary.verbs);
  const emoji = getRandomEmoji();

  return `${adjective} ${noun} пришел ${adverbsAndExpressions} ${verbs}  ${emoji}`;
};
