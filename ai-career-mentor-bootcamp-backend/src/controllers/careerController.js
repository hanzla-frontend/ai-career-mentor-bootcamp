import { discoverInterests, matchCareers, buildRoadmap } from '../services/careerService.js';

export const careerController = {
  discoverInterests: async (req, res) => {
    try {
      const { responses } = req.body;
      if (!responses) return res.status(400).json({ error: 'Responses are required' });
      
      const result = await discoverInterests(responses);
      res.json({ success: true, ...result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  matchCareers: async (req, res) => {
    try {
      const { profile } = req.body;
      if (!profile) return res.status(400).json({ error: 'Profile is required' });
      
      const result = await matchCareers(profile);
      res.json({ success: true, ...result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  buildRoadmap: async (req, res) => {
    try {
      const { career, profile, timeCommitment } = req.body;
      if (!career || !profile) {
        return res.status(400).json({ error: 'Career and profile are required' });
      }
      
      const result = await buildRoadmap(career, profile, timeCommitment);
      res.json({ success: true, ...result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};