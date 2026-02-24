import { clearCommand } from '../commands/clear.ts';
import { helpCommand } from '../commands/help.ts';
import { memeCommand } from '../commands/meme.ts';
import { pingCommand } from '../commands/ping.ts';
import { askCommand } from './ask.ts';
import { randomPicCommand } from './randompic.ts';

export const commands = {
  help: helpCommand,
  ping: pingCommand,
  clear: clearCommand,
  meme: memeCommand,
  randompic: randomPicCommand,
  ask: askCommand
};
