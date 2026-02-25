import axios from 'axios';
import { requireEnv } from '../config/env.ts';

export const apiLeagueInstance = axios.create({
  baseURL: requireEnv('API_LEAGUE_URL'),
  timeout: 20000,
  headers: { 'x-api-key': requireEnv('API_LEAGUE_KEY') }
});
