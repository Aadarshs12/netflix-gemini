import OpenAI from 'openai';
import { OPEN_AI_KEY } from './constant';

const openai = new OpenAI({
  apiKey: process.env[OPEN_AI_KEY],
});

export default openai;