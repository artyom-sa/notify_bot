export const getRandomNumber = (offset?: number) => {
  return Math.floor(Math.random() * (offset ?? 100));
};
