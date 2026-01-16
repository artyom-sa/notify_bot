import colors from 'colors';

const themes = {
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
} as const;

colors.setTheme(themes);

const log = (message: string, theme: keyof typeof themes = 'warn'): void => {
  console.log(colors[themes[theme]](`${message}\n`));
};

const consoleLogError = (message: string) => log(message, 'error');
const consoleLogInfo = (message: string) => log(message, 'info');
const consoleLogHelp = (message: string) => log(message, 'help');
const consoleLogSilly = (message: string) => log(message, 'silly');
const consoleLogDebug = (message: string) => log(message, 'debug');

const loggerMapper = {
  error: consoleLogError,
  info: consoleLogInfo,
  help: consoleLogHelp,
  silly: consoleLogSilly,
  debug: consoleLogDebug
};

export const logger = (
  theme: keyof typeof loggerMapper,
  message: string,
  body?: string
) => {
  loggerMapper[theme](message);
  if (body) loggerMapper[theme](body);
};
