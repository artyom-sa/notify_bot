export const COMMANDS_LIST = [
  {
    command: 'help',
    description: 'Показывает список команд и их описание',
    pattern: /^\/help(?:@notify_vaflebaza_bot)?$/
  },
  {
    command: 'ping',
    description: 'Пинг-понг с ботом',
    pattern: /^\/ping(?:@notify_vaflebaza_bot)?$/
  },
  {
    command: 'clear',
    description:
      'Удалить 10 сообщений или укажите количество для удаления (работает только в группах, боту требуются права администратора)',
    pattern: /^\/(?:clear(?:@notify_vaflebaza_bot)?)(?:\s+(\d+))?$/
  },
  {
    command: 'meme',
    description:
      'Отправка случайного мема из API Legend, отображение количества выполненных запросов и оставшихся',
    pattern: /^\/meme(?:@notify_vaflebaza_bot)?$/
  },
  {
    command: 'randompic',
    description:
      'Отправить случайное изображение из Pinterest на тему random pics или укажите тему в команде',
    pattern: /^\/(?:randompic(?:@notify_vaflebaza_bot)?)(?:\s+(.+))?$/
  },
  {
    command: 'ask',
    description: 'Задать гроку вопрос через бота',
    pattern: /^\/(?:ask(?:@notify_vaflebaza_bot)?)(?:\s+(.+))?$/
  }
];
