import { generateInterviewQuestions, generateMockInterview } from '../services/interviewService.js';

export const interviewController = {
  generate: async (req, res) => {
    try {
      const { career, count } = req.body;
      
      if (!career) {
        return res.status(400).json({ error: 'Career is required' });
      }

      const result = await generateInterviewQuestions(career, count || 10);
      res.json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  mock: async (req, res) => {
    try {
      const { career, experience, skills } = req.body;
      
      if (!career) {
        return res.status(400).json({ error: 'Career is required' });
      }

      const result = await generateMockInterview(career, experience, skills);
      res.json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};