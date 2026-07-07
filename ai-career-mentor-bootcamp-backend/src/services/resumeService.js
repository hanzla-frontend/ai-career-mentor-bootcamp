import Groq from 'groq-sdk';
import { config } from '../config/index.js';

const client = new Groq({ apiKey: config.GROQ_API_KEY });

export const generateResume = async (career, experience, skills, education) => {
  try {
    const messages = [
      { role: 'system', content: 'You are a professional resume writer with 10+ years of experience.' },
      { role: 'user', content: `Create a professional resume for a ${career} position.

        Experience: ${experience}
        Skills: ${skills}
        Education: ${education}

        Please format the resume with:
        1. Professional Summary
        2. Key Skills
        3. Work Experience (3 bullet points)
        4. Education
        5. Certifications (if applicable)
        6. Projects (if applicable)` }
    ];

    const response = await client.chat.completions.create({
      messages,
      model: config.GROQ_MODEL,
      temperature: 0.7,
      max_completion_tokens: 4096,
    });

    return {
      career,
      resume: response.choices[0].message.content,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Resume Service Error:', error);
    throw new Error(`Failed to generate resume: ${error.message}`);
  }
};

export const tailorResume = async (currentResume, jobDescription) => {
  try {
    const messages = [
      { role: 'system', content: 'You are a professional resume tailor with experience in ATS optimization.' },
      { role: 'user', content: `Tailor this resume for the following job description:

        CURRENT RESUME:
        ${currentResume}

        JOB DESCRIPTION:
        ${jobDescription}

        Please update the resume to match the job description while keeping it professional and authentic.` }
    ];

    const response = await client.chat.completions.create({
      messages,
      model: config.GROQ_MODEL,
      temperature: 0.7,
      max_completion_tokens: 4096,
    });

    return {
      tailoredResume: response.choices[0].message.content,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Tailor Resume Error:', error);
    throw new Error(`Failed to tailor resume: ${error.message}`);
  }
};