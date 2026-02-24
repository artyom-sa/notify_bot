export const COMMANDS_LIST = [
  {
    command: 'help',
    description: 'Показывает список команд и их описание',
    pattern: /^\/help$/
  },
  {
    command: 'ping',
    description: 'Пинг-понг с ботом',
    pattern: /^\/ping$/
  },
  {
    command: 'clear',
    description:
      'Удалить 10 сообщений или укажите количество для удаления (работает только в группах, боту требуются права администратора)',
    pattern: /clear(?:\s+(\d+))?\b/
  },
  {
    command: 'meme',
    description:
      'Отправка случайного мема из API Legend, отображение количества выполненных запросов и оставшихся',
    pattern: /^\/meme$/
  },
  {
    command: 'randompic',
    description:
      'Отправить случайное изображение из Pinterest на тему random pics или укажите тему в команде',
    pattern: /\/randompic(?:\s+(.+))?/
  },
  {
    command: 'ask',
    description: 'Задать гроку вопрос через бота',
    pattern: /\/ask(?:\s+(.+))?/
  }
];
