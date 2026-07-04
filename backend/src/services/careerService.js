import Groq from 'groq-sdk';
import { config } from '../config/index.js';
import { SYSTEM_PROMPTS } from '../config/prompts.js';

const client = new Groq({ apiKey: config.GROQ_API_KEY });

export const discoverInterests = async (responses) => {
  try {
    const messages = [
      { role: 'system', content: SYSTEM_PROMPTS.CAREER_DISCOVERY },
      { role: 'user', content: responses.join('\n') },
      { role: 'user', content: 'Based on what I shared, what are my interests and values?' }
    ];

    const chatCompletion = await client.chat.completions.create({
      messages,
      model: config.GROQ_MODEL,
      temperature: 0.8,
      max_completion_tokens: 2048,
    });

    return {
      interests: chatCompletion.choices[0]?.message?.content || '',
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Career Discovery Error:', error);
    throw new Error(`Career discovery failed: ${error.message}`);
  }
};

export const matchCareers = async (profile) => {
  try {
    const messages = [
      { role: 'system', content: SYSTEM_PROMPTS.CAREER_MATCHING },
      { role: 'user', content: `My profile: ${JSON.stringify(profile)}` },
      { role: 'user', content: 'Find my career matches with match percentages.' }
    ];

    const chatCompletion = await client.chat.completions.create({
      messages,
      model: config.GROQ_MODEL,
      temperature: 0.6,
      max_completion_tokens: 4096,
    });

    return {
      matches: chatCompletion.choices[0]?.message?.content || '',
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Career Matching Error:', error);
    throw new Error(`Career matching failed: ${error.message}`);
  }
};

export const buildRoadmap = async (career, profile, timeCommitment = 15) => {
  try {
    const messages = [
      { role: 'system', content: SYSTEM_PROMPTS.CAREER_ROADMAP },
      { role: 'system', content: `Time commitment: ${timeCommitment} hours/week` },
      { role: 'user', content: `My chosen career: ${career}` },
      { role: 'user', content: `My profile: ${JSON.stringify(profile)}` },
    ];

    const chatCompletion = await client.chat.completions.create({
      messages,
      model: config.GROQ_MODEL,
      temperature: 0.7,
      max_completion_tokens: 8192,
    });

    return {
      roadmap: chatCompletion.choices[0]?.message?.content || '',
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Roadmap Error:', error);
    throw new Error(`Roadmap building failed: ${error.message}`);
  }
};