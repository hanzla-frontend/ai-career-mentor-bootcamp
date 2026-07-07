import careersData from '../data/careers.json' assert { type: 'json' };

export const analyzeSkillGap = (currentSkills, targetCareer) => {
  const career = careersData.careers.find(c => c.title === targetCareer);
  if (!career) return null;

  const requiredSkills = career.skills?.technical || [];
  const missingSkills = requiredSkills.filter(skill => 
    !currentSkills.some(s => s.toLowerCase() === skill.toLowerCase())
  );

  const matchedSkills = requiredSkills.filter(skill =>
    currentSkills.some(s => s.toLowerCase() === skill.toLowerCase())
  );

  return {
    career: targetCareer,
    totalRequired: requiredSkills.length,
    skillsMatched: matchedSkills.length,
    matchPercentage: Math.round((matchedSkills.length / requiredSkills.length) * 100),
    missingSkills: missingSkills,
    matchedSkills: matchedSkills,
    learningPriority: missingSkills.slice(0, 5)
  };
};

export const suggestLearningPath = (missingSkills) => {
  const priority = [];
  const resources = {
    'JavaScript': ['freeCodeCamp', 'The Odin Project', 'JavaScript.info'],
    'Python': ['freeCodeCamp', 'Codecademy', 'Python.org'],
    'React': ['React Docs', 'Scrimba', 'freeCodeCamp'],
    'Node.js': ['Node.js Docs', 'The Odin Project'],
    'SQL': ['W3Schools', 'SQLZoo', 'Mode Analytics']
  };

  missingSkills.forEach(skill => {
    const skillLower = skill.toLowerCase();
    let found = false;
    for (const [key, value] of Object.entries(resources)) {
      if (skillLower.includes(key.toLowerCase())) {
        priority.push({
          skill,
          resources: value,
          estimatedTime: '2-4 weeks'
        });
        found = true;
        break;
      }
    }
    if (!found) {
      priority.push({
        skill,
        resources: ['freeCodeCamp', 'YouTube Tutorials', 'Practice Projects'],
        estimatedTime: '3-6 weeks'
      });
    }
  });

  return priority;
};