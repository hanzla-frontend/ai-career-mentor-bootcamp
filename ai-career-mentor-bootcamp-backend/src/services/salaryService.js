import salariesData from '../data/salaries.json' assert { type: 'json' };

export const getSalaryData = (career, location = 'US') => {
  try {
    const careerData = salariesData.salaries[career];
    if (!careerData) return null;
    
    const locationData = careerData[location] || careerData['US'];
    return {
      career,
      location,
      ...locationData
    };
  } catch (error) {
    console.error('Salary Service Error:', error);
    return null;
  }
};

export const getSalaryRange = (career, location = 'US') => {
  const data = getSalaryData(career, location);
  if (!data) return '$80k - $150k';
  return `$${data.entry.toLocaleString()} - $${data.senior.toLocaleString()}`;
};

export const getAverageSalary = (career, location = 'US') => {
  const data = getSalaryData(career, location);
  if (!data) return 115000;
  return Math.round((data.entry + data.mid + data.senior) / 3);
};

export const compareSalaries = (careers, location = 'US') => {
  return careers.map(career => ({
    career,
    ...getSalaryData(career, location)
  }));
};
