import {
  GROK_MODEL,
  GROK_PRESET,
  GROK_PRESET_DEFAULT
} from '../constants/mentions.ts';
import { groq } from '../http/groqInstance.ts';

export type GetGroqAnswerOptions = {
  rude?: boolean;
};

export const getGroqAnswer = async (
  userPrompt: string,
  options?: GetGroqAnswerOptions
) => {
  const chatCompletion = await groq.chat.completions.create({
    model: GROK_MODEL,
    messages: [
      {
        role: 'system',
        content: options.rude ? GROK_PRESET_DEFAULT : GROK_PRESET
      },
      { role: 'user', content: userPrompt }
    ],
    temperature: 0.7
  });

  return chatCompletion.choices[0].message.content;
};
