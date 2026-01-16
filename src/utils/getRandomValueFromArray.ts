export const getRandomValueFromArray = <T>(arr: T[]): T => {
  const randomIndex = Math.floor(Math.random() * arr.length);

  return arr[randomIndex];
};
