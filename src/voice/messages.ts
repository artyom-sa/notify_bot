import { randomEmoji, randomGreeting } from '../greeting/random.ts';

export function formatJoinMessage(input: {
  channelName: string;
  joinerName: string;
  memberNames: string[];
}): string {
  const lines = [
    `Уважаемая вафлебаза! Присоединяйтесь в канал <b>${input.channelName}</b>`,
    '',
    `<b>${input.joinerName}</b> ${randomGreeting()}`,
    '',
    'Сейчас в канале:'
  ];

  for (const name of input.memberNames) {
    lines.push(`<b>${name} ${randomEmoji()}</b>`);
  }

  return lines.join('\n');
}

export function formatEmptyChannelMessage(channelName: string): string {
  return (
    `📢 Канал <b>${channelName}</b> опустел\n\n` +
    'Последний участник покинул голосовой канал 😢'
  );
}
