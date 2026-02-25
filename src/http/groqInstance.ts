import Groq from 'groq-sdk';
import { requireEnv } from '../config/env.ts';

export const groq = new Groq({
  apiKey: requireEnv('GROK_API_KEY')
});
