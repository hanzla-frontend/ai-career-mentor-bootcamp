import { generateResume, tailorResume } from '../services/resumeService.js';

export const resumeController = {
  generate: async (req, res) => {
    try {
      const { career, experience, skills, education } = req.body;
      
      if (!career) {
        return res.status(400).json({ error: 'Career is required' });
      }

      const result = await generateResume(career, experience, skills, education);
      res.json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  tailor: async (req, res) => {
    try {
      const { currentResume, jobDescription } = req.body;
      
      if (!currentResume || !jobDescription) {
        return res.status(400).json({ 
          error: 'Current resume and job description are required' 
        });
      }

      const result = await tailorResume(currentResume, jobDescription);
      res.json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};