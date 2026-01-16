export const getRandomEmoji = () => {
  const min = 0x1f300;
  const max = 0x1faff;

  const codePoint = Math.floor(Math.random() * (max - min + 1)) + min;

  return String.fromCodePoint(codePoint);
};
