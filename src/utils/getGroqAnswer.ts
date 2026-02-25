import {
  GROK_MODEL,
  GROK_PRESET,
  GROK_PRESET_DEFAULT
} from '../constants/mentions.ts';
import { groq } from '../http/groqInstance.ts';

type GetGroqAnswerArgs = {
  userPrompt: string;
  rude?: boolean;
  /**
   * What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. We generally recommend altering this or top_p but not both.
   */
  temperature?: number;
};

export const getGroqAnswer = async ({
  userPrompt,
  rude = false,
  temperature = 0.7
}: GetGroqAnswerArgs) => {
  const chatCompletion = await groq.chat.completions.create({
    model: GROK_MODEL,
    messages: [
      {
        role: 'system',
        content: rude ? GROK_PRESET : GROK_PRESET_DEFAULT
      },
      { role: 'user', content: userPrompt }
    ],
    temperature
  });

  return chatCompletion.choices[0].message.content;
};
