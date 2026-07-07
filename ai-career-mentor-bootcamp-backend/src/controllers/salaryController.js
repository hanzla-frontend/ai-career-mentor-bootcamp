import { getSalaryData, compareSalaries, getAverageSalary } from '../services/salaryService.js';

export const salaryController = {
  getSalary: async (req, res) => {
    try {
      const { career } = req.params;
      const { location } = req.query;
      
      const data = getSalaryData(career, location);
      if (!data) {
        return res.status(404).json({ error: 'Career not found' });
      }
      
      res.json({ success: true, data });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  compareSalaries: async (req, res) => {
    try {
      const { careers, location } = req.body;
      const results = compareSalaries(careers, location);
      res.json({ success: true, data: results });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getTrends: async (req, res) => {
    try {
      const { career } = req.params;
      // Mock trends data
      res.json({
        success: true,
        data: {
          career,
          growth: '26%',
          demand: 'High',
          trend: '📈 Rising demand',
          topCompanies: ['Google', 'Microsoft', 'Amazon']
        }
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};