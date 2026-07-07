import React, { useState, useEffect } from 'react';
import { getSalaryData, compareSalaries } from '../services/salaryService';
import SalaryChart from '../components/Career/SalaryChart';
import './SalaryTracker.css';

const SalaryTracker = () => {
  const [career, setCareer] = useState('Software Engineer');
  const [location, setLocation] = useState('US');
  const [salaryData, setSalaryData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const locations = ['US', 'UK', 'Canada', 'India'];
  const careers = ['Software Engineer', 'Data Scientist', 'Frontend Developer', 'DevOps Engineer', 'AI/ML Engineer'];

  useEffect(() => {
    fetchSalaryData();
  }, [career, location]);

  const fetchSalaryData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getSalaryData(career, location);
      setSalaryData(data);
    } catch (err) {
      setError('Failed to fetch salary data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">📊 Loading salary data...</div>;
  if (error) return <div className="error">⚠️ {error}</div>;

  return (
    <div className="salary-tracker fade-in">
      <h1>💰 Salary Tracker</h1>
      <p className="subtitle">Compare salaries for different careers and locations</p>

      <div className="salary-filters">
        <div className="filter-group">
          <label>Career</label>
          <select value={career} onChange={(e) => setCareer(e.target.value)}>
            {careers.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Location</label>
          <select value={location} onChange={(e) => setLocation(e.target.value)}>
            {locations.map(l => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>
      </div>

      {salaryData && (
        <div className="salary-results">
          <div className="salary-cards">
            <div className="salary-card">
              <h3>Entry Level</h3>
              <p className="salary-amount">${salaryData.entry?.toLocaleString() || 'N/A'}</p>
              <span className="salary-label">Starting salary</span>
            </div>
            <div className="salary-card mid">
              <h3>Mid Level</h3>
              <p className="salary-amount">${salaryData.mid?.toLocaleString() || 'N/A'}</p>
              <span className="salary-label">5+ years experience</span>
            </div>
            <div className="salary-card senior">
              <h3>Senior Level</h3>
              <p className="salary-amount">${salaryData.senior?.toLocaleString() || 'N/A'}</p>
              <span className="salary-label">10+ years experience</span>
            </div>
          </div>

          <SalaryChart data={salaryData} career={career} location={location} />
        </div>
      )}

      <style>{`
        .salary-tracker {
          max-width: 1000px;
          margin: 0 auto;
          padding: 2rem 0;
        }
        .salary-tracker h1 {
          font-size: 2.5rem;
          font-weight: 400;
          color: #2C2420;
        }
        .subtitle {
          color: #7A6B62;
          margin-bottom: 2rem;
        }
        .salary-filters {
          display: flex;
          gap: 2rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          background: white;
          padding: 1.5rem;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(44, 36, 32, 0.06);
        }
        .filter-group {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          flex: 1;
          min-width: 150px;
        }
        .filter-group label {
          font-size: 0.8rem;
          font-weight: 500;
          color: #7A6B62;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .filter-group select {
          padding: 0.6rem 1rem;
          border: 1px solid #E8DDD5;
          border-radius: 10px;
          font-size: 1rem;
          background: white;
        }
        .salary-results {
          margin-top: 1.5rem;
        }
        .salary-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        .salary-card {
          background: white;
          padding: 1.5rem;
          border-radius: 16px;
          text-align: center;
          box-shadow: 0 4px 20px rgba(44, 36, 32, 0.06);
          border-top: 4px solid #A89A92;
        }
        .salary-card.mid {
          border-top-color: #8B6B4D;
        }
        .salary-card.senior {
          border-top-color: #4A7C7B;
        }
        .salary-card h3 {
          font-weight: 500;
          color: #2C2420;
          margin-bottom: 0.5rem;
        }
        .salary-amount {
          font-size: 2rem;
          font-weight: 600;
          color: #2C2420;
        }
        .salary-label {
          font-size: 0.8rem;
          color: #7A6B62;
        }
        .loading, .error {
          text-align: center;
          padding: 3rem;
          font-size: 1.2rem;
        }
        .error { color: #D32F2F; }
        @media (max-width: 600px) {
          .salary-filters {
            flex-direction: column;
            gap: 1rem;
          }
          .salary-cards {
            grid-template-columns: 1fr;
          }
          .salary-amount {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default SalaryTracker;