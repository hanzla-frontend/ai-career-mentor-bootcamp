import Groq from 'groq-sdk';
import { config } from '../config/index.js';

const client = new Groq({ apiKey: config.GROQ_API_KEY });

export const generateInterviewQuestions = async (career, count = 10) => {
  try {
    const messages = [
      { role: 'system', content: `You are an expert technical interviewer for ${career} positions.` },
      { role: 'user', content: `Generate ${count} interview questions for a ${career} position. Include:
        - 3-4 technical questions
        - 3-4 behavioral questions
        - 2-3 situational questions
        - 1-2 problem-solving questions
        Format each question with a category label.` }
    ];

    const response = await client.chat.completions.create({
      messages,
      model: config.GROQ_MODEL,
      temperature: 0.7,
      max_completion_tokens: 4096,
    });

    return {
      career,
      questions: response.choices[0].message.content,
      count,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Interview Service Error:', error);
    throw new Error(`Failed to generate interview questions: ${error.message}`);
  }
};

export const generateMockInterview = async (career, experience, skills) => {
  try {
    const messages = [
      { role: 'system', content: `You are conducting a mock interview for a ${career} position.` },
      { role: 'user', content: `The candidate has ${experience} experience and skills: ${skills}. 
        Start a mock interview with:
        1. A brief introduction
        2. First technical question
        3. Wait for candidate response` }
    ];

    const response = await client.chat.completions.create({
      messages,
      model: config.GROQ_MODEL,
      temperature: 0.8,
      max_completion_tokens: 2048,
    });

    return {
      mockInterview: response.choices[0].message.content,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Mock Interview Error:', error);
    throw new Error(`Failed to generate mock interview: ${error.message}`);
  }
};