import { apiLeagueInstance } from '../http/apiLeague.ts';

export const getApiLeagueMeme = async () => {
  const apiLeagueResponse = await apiLeagueInstance.get(
    '/retrieve-random-meme',
    {
      params: {
        minRating: 1,
        maxAgeDays: 5
      }
    }
  );

  const requestCountLeft = apiLeagueResponse.headers['x-api-quota-left'];
  const requestCountUsed = apiLeagueResponse.headers['x-api-quota-used'];

  const memeDescription = apiLeagueResponse.data.description;
  const memeUrl = apiLeagueResponse.data.url as string;

  const text = `🐸 Описание мема: ${memeDescription}\n\nОсталось мемов на сегодня ${requestCountLeft}\nИспользовано мемов ${requestCountUsed}`;

  return { memeUrl, text };
};
