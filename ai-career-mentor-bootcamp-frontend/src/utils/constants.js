export const APP_NAME = 'AI Career Mentor';
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const DAYS = [
  { id: 1, name: 'Career Discovery', icon: '🔍', path: '/day1' },
  { id: 2, name: 'Career Matching', icon: '🎯', path: '/day2' },
  { id: 3, name: 'Career Roadmap', icon: '🗺️', path: '/day3' },
];

export const SAMPLE_QUESTIONS = [
  'What do you love doing in your free time?',
  'What are you naturally good at?',
  'What kind of impact do you want to make?',
  'What did you want to be when you were a child?',
];

export const CAREER_ICONS = {
  'Software Engineer': '💻',
  'UX/UI Designer': '🎨',
  'Data Scientist': '📊',
  'Product Manager': '📱',
  'DevOps Engineer': '☁️',
};