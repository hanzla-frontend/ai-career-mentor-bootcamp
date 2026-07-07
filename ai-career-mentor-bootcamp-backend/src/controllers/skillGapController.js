import { analyzeSkillGap, suggestLearningPath } from '../services/skillGapService.js';

export const skillGapController = {
  analyze: async (req, res) => {
    try {
      const { currentSkills, targetCareer } = req.body;
      
      if (!currentSkills || !targetCareer) {
        return res.status(400).json({ 
          error: 'Current skills and target career are required' 
        });
      }

      const result = analyzeSkillGap(currentSkills, targetCareer);
      if (!result) {
        return res.status(404).json({ error: 'Career not found' });
      }

      res.json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  learningPath: async (req, res) => {
    try {
      const { missingSkills } = req.body;
      const path = suggestLearningPath(missingSkills);
      res.json({ success: true, data: path });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};