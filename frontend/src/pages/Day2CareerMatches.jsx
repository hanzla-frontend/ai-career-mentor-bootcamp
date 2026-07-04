
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Day2CareerMatches = () => {
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [parsedMatches, setParsedMatches] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  // Helper function to parse career matches from AI response
  const parseCareerMatches = (text) => {
    if (!text || typeof text !== 'string') return [];
    
    const careers = [];
    const lines = text.split('\n');
    let currentCareer = null;
    let currentSection = null;
    let matchPercentage = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Match career titles with numbers (1. **Data Scientist**)
      const titleMatch = line.match(/^(\d+)\.\s*\*\*(.+?)\*\*/);
      if (titleMatch) {
        if (currentCareer) {
          careers.push(currentCareer);
        }
        // Extract match percentage from title if present
        const percentMatch = line.match(/\((\d+)%/);
        matchPercentage = percentMatch ? parseInt(percentMatch[1]) : 85;
        
        currentCareer = {
          title: titleMatch[2].trim(),
          matchPercentage: matchPercentage,
          why: '',
          skills: [],
          salary: '',
          demand: '',
          growth: '',
          icon: getCareerIcon(titleMatch[2].trim())
        };
        currentSection = null;
        continue;
      }

      // Match "WHY it fits" section
      if (line.includes('WHY it fits') || line.includes('WHY it fits:')) {
        currentSection = 'why';
        const whyText = line.replace(/^.*?WHY it fits:?\s*/, '');
        if (whyText && currentCareer) {
          currentCareer.why = whyText;
        }
        continue;
      }

      // Match "Required skills" section
      if (line.includes('Required skills')) {
        currentSection = 'skills';
        const skillsText = line.replace(/^.*?Required skills:?\s*/, '');
        if (skillsText && currentCareer) {
          currentCareer.skills = skillsText.split(',').map(s => s.trim()).filter(s => s);
        }
        continue;
      }

      // Match "Salary range" section
      if (line.includes('Salary range')) {
        currentSection = 'salary';
        const salaryText = line.replace(/^.*?Salary range:?\s*/, '');
        if (salaryText && currentCareer) {
          currentCareer.salary = salaryText;
        }
        continue;
      }

      // Match "Job demand" section
      if (line.includes('Job demand')) {
        currentSection = 'demand';
        const demandText = line.replace(/^.*?Job demand:?\s*/, '');
        if (demandText && currentCareer) {
          currentCareer.demand = demandText;
        }
        continue;
      }

      // Collect content for current section
      if (currentCareer && currentSection) {
        if (currentSection === 'why' && !line.match(/^\* Required skills|^\* Salary range|^\* Job demand/)) {
          if (currentCareer.why && currentCareer.why.length < 500) {
            currentCareer.why += ' ' + line;
          } else if (!currentCareer.why) {
            currentCareer.why = line;
          }
        }
        if (currentSection === 'skills' && !line.match(/^\* /)) {
          const newSkills = line.split(',').map(s => s.trim()).filter(s => s);
          currentCareer.skills = [...currentCareer.skills, ...newSkills];
        }
      }
    }

    // Add the last career
    if (currentCareer) {
      careers.push(currentCareer);
    }

    // Clean up skills and remove duplicates
    careers.forEach(career => {
      if (career.skills && career.skills.length > 0) {
        // Remove duplicates and limit to 6
        const uniqueSkills = [...new Set(career.skills)];
        career.skills = uniqueSkills.slice(0, 6);
      }
    });

    return careers;
  };

  // Get icon based on career title
  const getCareerIcon = (title) => {
    const icons = {
      'Data Scientist': '📊',
      'Software Engineer': '💻',
      'DevOps Engineer': '☁️',
      'AI/ML Engineer': '🤖',
      'Machine Learning Engineer': '🧠',
      'Product Manager': '📱',
      'Technical Writer': '📝',
      'Cybersecurity Specialist': '🔒',
      'UX Designer': '🎨',
      'UI Designer': '🎨',
      'Full Stack Developer': '🌐',
      'Frontend Developer': '🎯',
      'Backend Developer': '⚙️',
    };
    // Find matching icon
    for (const [key, icon] of Object.entries(icons)) {
      if (title.toLowerCase().includes(key.toLowerCase())) {
        return icon;
      }
    }
    return '💼';
  };

  // Get badge type based on match percentage
  const getBadgeType = (percentage) => {
    if (percentage >= 90) return 'top';
    if (percentage >= 80) return 'silver';
    if (percentage >= 70) return 'bronze';
    return 'standard';
  };

  // Get badge label based on match percentage
  const getBadgeLabel = (percentage) => {
    if (percentage >= 90) return 'Top Pick 🏆';
    if (percentage >= 80) return 'Great Match ✨';
    if (percentage >= 70) return 'Strong Match 💪';
    return 'Consider 🔍';
  };

  // Get match color based on percentage
  const getMatchColor = (percentage) => {
    if (percentage >= 90) return '#4A7C7B';
    if (percentage >= 80) return '#8B6B4D';
    if (percentage >= 70) return '#C4A484';
    return '#A89A92';
  };

  useEffect(() => {
    const getMatches = async () => {
      try {
        setLoading(true);
        const profile = JSON.parse(localStorage.getItem('career_profile') || '{}');
        
        // If no profile, use default interests
        if (!profile.interests || profile.interests.length === 0) {
          profile.interests = ['coding', 'problem solving', 'technology'];
        }
        
        const response = await axios.post(`${API_URL}/api/career/match`, { profile });
        
        if (response.data.matches) {
          const parsed = parseCareerMatches(response.data.matches);
          if (parsed.length > 0) {
            setParsedMatches(parsed);
          } else {
            // Fallback: use the raw text
            setParsedMatches([{
              title: 'View All Matches',
              matchPercentage: 85,
              why: response.data.matches,
              skills: ['Python', 'JavaScript', 'Data Analysis'],
              salary: '$80k - $160k',
              demand: 'High',
              icon: '📊'
            }]);
          }
        }
        setMatches(response.data.matches);
      } catch (error) {
        console.error('Error:', error);
        setError('Sorry, I had trouble finding your career matches. Please try again.');
        // Fallback data
        setParsedMatches([
          {
            title: 'Software Engineer',
            matchPercentage: 92,
            why: 'Your interest in coding and problem-solving makes this a great fit.',
            skills: ['JavaScript', 'Python', 'React', 'Node.js', 'SQL'],
            salary: '$105k - $160k',
            demand: 'High (21% growth)',
            icon: '💻'
          },
          {
            title: 'Data Scientist',
            matchPercentage: 88,
            why: 'Your analytical thinking and love for puzzles align perfectly.',
            skills: ['Python', 'SQL', 'Machine Learning', 'Statistics'],
            salary: '$118k - $170k',
            demand: 'High (36% growth)',
            icon: '📊'
          },
          {
            title: 'AI/ML Engineer',
            matchPercentage: 85,
            why: 'Your curiosity about AI and complex problem-solving fit well.',
            skills: ['Python', 'TensorFlow', 'PyTorch', 'Deep Learning'],
            salary: '$141k - $200k',
            demand: 'Very High (34% growth)',
            icon: '🤖'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    getMatches();
  }, []);

  const handleSelectCareer = (careerTitle, matchScore) => {
    localStorage.setItem('selected_career', JSON.stringify({
      title: careerTitle,
      matchScore: matchScore || 85
    }));
    navigate('/day3');
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">🧠</div>
        <p>Analyzing your career matches...</p>
        <p className="loading-sub">This may take a moment</p>
        <style>{`
          .loading-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 60vh;
            text-align: center;
          }
          .loading-spinner {
            font-size: 4rem;
            animation: spin 2s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .loading-container p {
            color: #2C2420;
            font-size: 1.2rem;
            margin-top: 1rem;
          }
          .loading-sub {
            color: #7A6B62 !important;
            font-size: 0.9rem !important;
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div className="day2-container fade-in">
        <h1>🎯 Day 2: Your Career Matches</h1>
        <p className="subtitle">Based on your interests and values, here are your top career paths.</p>
        <div className="error-message">
          <p>⚠️ {error}</p>
          <button onClick={() => window.location.reload()}>🔄 Try Again</button>
          <button onClick={() => navigate('/day1')} style={{ marginLeft: '1rem' }}>← Back to Day 1</button>
        </div>
        <style>{`
          .day2-container {
            max-width: 1100px;
            margin: 0 auto;
            padding: 2rem 0;
          }
          .day2-container h1 {
            font-size: 2.5rem;
            font-weight: 400;
            color: #2C2420;
          }
          .subtitle {
            color: #7A6B62;
            margin-bottom: 2rem;
          }
          .error-message {
            text-align: center;
            padding: 3rem;
            background: white;
            border-radius: 16px;
            box-shadow: 0 4px 20px rgba(44, 36, 32, 0.06);
          }
          .error-message p {
            color: #5A4E48;
            margin-bottom: 1rem;
          }
          .error-message button {
            background: #8B6B4D;
            color: white;
            border: none;
            padding: 0.6rem 2rem;
            border-radius: 40px;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.3s ease;
          }
          .error-message button:hover {
            background: #7A5E44;
            transform: translateY(-2px);
          }
        `}</style>
      </div>
    );
  }

  const displayCareers = parsedMatches.length > 0 ? parsedMatches : [
    {
      title: 'Software Engineer',
      matchPercentage: 92,
      why: 'Your interest in coding and problem-solving makes this a great fit.',
      skills: ['JavaScript', 'Python', 'React', 'Node.js', 'SQL'],
      salary: '$105k - $160k',
      demand: 'High (21% growth)',
      icon: '💻'
    },
    {
      title: 'Data Scientist',
      matchPercentage: 88,
      why: 'Your analytical thinking and love for puzzles align perfectly.',
      skills: ['Python', 'SQL', 'Machine Learning', 'Statistics'],
      salary: '$118k - $170k',
      demand: 'High (36% growth)',
      icon: '📊'
    },
    {
      title: 'AI/ML Engineer',
      matchPercentage: 85,
      why: 'Your curiosity about AI and complex problem-solving fit well.',
      skills: ['Python', 'TensorFlow', 'PyTorch', 'Deep Learning'],
      salary: '$141k - $200k',
      demand: 'Very High (34% growth)',
      icon: '🤖'
    }
  ];

  return (
    <div className="day2-container fade-in">
      <h1>🎯 Day 2: Your Career Matches</h1>
      <p className="subtitle">Based on your interests and values, here are your top career paths.</p>

      <div className="matches-grid">
        {displayCareers.map((career, index) => {
          const badgeType = getBadgeType(career.matchPercentage || 85);
          const badgeLabel = getBadgeLabel(career.matchPercentage || 85);
          const matchColor = getMatchColor(career.matchPercentage || 85);
          
          return (
            <div key={index} className="match-card">
              <div className="match-header">
                <span className="match-icon">{career.icon || '💼'}</span>
                <span className={`match-badge ${badgeType === 'top' ? 'match-badge-top' : badgeType === 'silver' ? 'match-badge-silver' : badgeType === 'bronze' ? 'match-badge-bronze' : ''}`}>
                  {badgeLabel}
                </span>
              </div>
              <h3>{career.title}</h3>
              <div className="match-percentage" style={{ color: matchColor }}>
                {career.matchPercentage || 85}% Match
              </div>
              <p className="career-why">{career.why || 'This career matches your interests and skills.'}</p>
              <div className="match-details">
                <div className="detail-item">
                  <span className="detail-label">💰 Salary</span>
                  <span>{career.salary || '$80k - $160k'}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">📈 Growth</span>
                  <span>{career.demand || 'High'}</span>
                </div>
              </div>
              <div className="match-skills">
                {(career.skills || ['Python', 'JavaScript']).slice(0, 5).map((skill, idx) => (
                  <span key={idx} className="skill-tag">{skill}</span>
                ))}
              </div>
              <button 
                className="btn-select" 
                onClick={() => handleSelectCareer(career.title, career.matchPercentage || 85)}
              >
                🗺️ Build My Roadmap →
              </button>
            </div>
          );
        })}
      </div>

      <style>{`
        .day2-container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 2rem 0;
        }
        .day2-container h1 {
          font-size: 2.5rem;
          font-weight: 400;
          color: #2C2420;
        }
        .subtitle {
          color: #7A6B62;
          margin-bottom: 2rem;
        }
        .matches-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 1.5rem;
        }
        .match-card {
          background: white;
          padding: 1.5rem;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(44, 36, 32, 0.06);
          border: 1px solid rgba(139, 107, 77, 0.06);
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
        }
        .match-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 30px rgba(44, 36, 32, 0.1);
        }
        .match-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.8rem;
        }
        .match-icon {
          font-size: 2rem;
        }
        .match-badge {
          padding: 0.2rem 0.8rem;
          border-radius: 30px;
          font-size: 0.7rem;
          font-weight: 500;
          color: white;
          background: #A89A92;
        }
        .match-badge-top {
          background: #4A7C7B;
        }
        .match-badge-silver {
          background: #8B6B4D;
        }
        .match-badge-bronze {
          background: #C4A484;
        }
        .match-percentage {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }
        .match-card h3 {
          font-weight: 500;
          color: #2C2420;
          margin-bottom: 0.3rem;
          font-size: 1.3rem;
        }
        .career-why {
          color: #5A4E48;
          margin-bottom: 1rem;
          flex: 1;
          font-size: 0.9rem;
          line-height: 1.6;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .match-details {
          display: flex;
          gap: 0.8rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;
        }
        .detail-item {
          flex: 1;
          min-width: 70px;
        }
        .detail-label {
          display: block;
          font-size: 0.65rem;
          color: #A89A92;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .detail-item span:last-child {
          font-size: 0.9rem;
          font-weight: 500;
          color: #2C2420;
        }
        .match-skills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-bottom: 1rem;
        }
        .skill-tag {
          background: #F0EBE6;
          padding: 0.2rem 0.8rem;
          border-radius: 30px;
          font-size: 0.7rem;
          color: #2C2420;
        }
        .btn-select {
          background: #8B6B4D;
          color: white;
          border: none;
          padding: 0.7rem 1.5rem;
          border-radius: 40px;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          margin-top: auto;
          cursor: pointer;
        }
        .btn-select:hover {
          background: #7A5E44;
          transform: translateY(-2px);
        }
        @media (max-width: 768px) {
          .matches-grid {
            grid-template-columns: 1fr;
          }
          .day2-container h1 {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Day2CareerMatches;