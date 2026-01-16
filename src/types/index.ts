export * from './sendMessage';
export * from './deleteMessage';
export * from './baseTypes';

type A = { a: string };
type B = { a: number };

type C = A | B;

const variable: C = { a: 1 };
