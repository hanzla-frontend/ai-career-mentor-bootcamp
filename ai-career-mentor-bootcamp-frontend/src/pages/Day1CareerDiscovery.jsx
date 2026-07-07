import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Day1CareerDiscovery = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/career/discover`, {
        responses: messages.map(m => m.content).concat(input)
      });

      const aiMessage = {
        role: 'assistant',
        content: response.data.interests
      };
      setMessages(prev => [...prev, aiMessage]);

      if (messages.length >= 4) {
        setCompleted(true);
        localStorage.setItem('career_profile', JSON.stringify({
          interests: messages.map(m => m.content),
          summary: response.data.interests
        }));
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'I had trouble responding. Please try again.'
      }]);
    } finally {
      setLoading(false);
    }
  };

  const sampleQuestions = [
    "What do you love doing in your free time?",
    "What are you naturally good at?",
    "What kind of impact do you want to make?",
    "What did you want to be when you were a child?"
  ];

  return (
    <div className="day1-container fade-in">
      <h1>🔍 Day 1: Career Discovery</h1>
      <p className="subtitle">Let's explore what makes you come alive. Share your thoughts honestly.</p>

      <div className="chat-section">
        <div className="messages-container">
          {messages.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">💭</div>
              <p>Start by sharing what you love, what you're good at, and what matters to you.</p>
              <div className="sample-questions">
                {sampleQuestions.map((q, i) => (
                  <button key={i} onClick={() => setInput(q)}>
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}
          {messages.map((msg, idx) => (
            <div key={idx} className={`message ${msg.role}`}>
              <span className="avatar">{msg.role === 'user' ? '👤' : '🧠'}</span>
              <div className="bubble">{msg.content}</div>
            </div>
          ))}
          {loading && (
            <div className="typing">
              <span>🧠</span>
              <span className="typing-dots">...</span>
              <span className="typing-text">AI is reflecting...</span>
            </div>
          )}
        </div>

        <div className="input-area">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Share your thoughts..."
            disabled={loading || completed}
          />
          <button onClick={sendMessage} disabled={loading || completed}>
            Send
          </button>
        </div>

        {completed && (
          <button className="btn-next" onClick={() => navigate('/day2')}>
            ✅ Ready for Day 2 →
          </button>
        )}
      </div>

      <style>{`
        .day1-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem 0;
        }
        
        .day1-container h1 {
          font-size: 2.5rem;
          font-weight: 400;
          color: var(--color-soft-black, #2C2420);
        }
        
        .subtitle {
          color: var(--color-muted, #7A6B62);
          margin-bottom: 2rem;
        }
        
        .chat-section {
          background: var(--color-white, #FFFFFF);
          border-radius: var(--radius-xl, 20px);
          padding: 1.5rem;
          box-shadow: var(--shadow-md, 0 4px 20px rgba(44, 36, 32, 0.06));
        }
        
        .messages-container {
          height: 400px;
          overflow-y: auto;
          padding: 0.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }
        
        .messages-container::-webkit-scrollbar {
          width: 4px;
        }
        .messages-container::-webkit-scrollbar-thumb {
          background: #D5C9C0;
          border-radius: 10px;
        }
        
        .message {
          display: flex;
          gap: 0.8rem;
          align-items: flex-start;
        }
        .message.user {
          flex-direction: row-reverse;
        }
        .avatar {
          font-size: 1.5rem;
          flex-shrink: 0;
        }
        .bubble {
          padding: 0.8rem 1.2rem;
          border-radius: var(--radius-lg, 16px);
          max-width: 80%;
          background: var(--color-light-gray, #F0EBE6);
          line-height: 1.6;
          word-wrap: break-word;
        }
        .message.user .bubble {
          background: var(--color-terracotta, #8B6B4D);
          color: white;
        }
        
        .typing {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          color: var(--color-muted, #7A6B62);
        }
        .typing-dots {
          animation: pulse 1.4s infinite;
        }
        .typing-text {
          font-style: italic;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        
        .empty-state {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: var(--color-muted, #7A6B62);
          padding: 2rem;
        }
        .empty-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        
        .sample-questions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          justify-content: center;
          margin-top: 1rem;
        }
        .sample-questions button {
          background: var(--color-light-gray, #F0EBE6);
          border: none;
          padding: 0.5rem 1.2rem;
          border-radius: var(--radius-full, 9999px);
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .sample-questions button:hover {
          background: var(--color-border, #E8DDD5);
          transform: translateY(-1px);
        }
        
        .input-area {
          display: flex;
          gap: 0.8rem;
          margin-top: 1rem;
          border-top: 1px solid var(--color-border, #E8DDD5);
          padding-top: 1rem;
        }
        .input-area input {
          flex: 1;
          padding: 0.8rem 1rem;
          border: 1px solid var(--color-border, #E8DDD5);
          border-radius: var(--radius-md, 12px);
          font-size: 1rem;
          font-family: var(--font-primary);
          transition: border-color 0.3s ease;
          min-width: 0;
        }
        .input-area input:focus {
          outline: none;
          border-color: var(--color-terracotta, #8B6B4D);
        }
        .input-area input:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .input-area button {
          background: var(--color-terracotta, #8B6B4D);
          color: white;
          border: none;
          padding: 0.8rem 1.8rem;
          border-radius: var(--radius-md, 12px);
          font-size: 1rem;
          transition: all 0.3s ease;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .input-area button:hover:not(:disabled) {
          background: #7A5E44;
        }
        .input-area button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .btn-next {
          background: var(--color-sage, #4A7C7B);
          color: white;
          border: none;
          padding: 0.8rem 2.5rem;
          border-radius: var(--radius-full, 9999px);
          font-size: 1rem;
          margin-top: 1.5rem;
          transition: all 0.3s ease;
          width: 100%;
        }
        .btn-next:hover {
          background: #3D6A69;
          transform: translateY(-2px);
        }
        
        /* ----- TABLET ----- */
        @media screen and (max-width: 1024px) {
          .day1-container h1 {
            font-size: 2.2rem;
          }
        }
        
        /* ----- MOBILE ----- */
        @media screen and (max-width: 768px) {
          .day1-container {
            padding: 1rem 0;
          }
          
          .day1-container h1 {
            font-size: 1.8rem;
          }
          
          .chat-section {
            padding: 1rem;
            border-radius: var(--radius-lg, 16px);
          }
          
          .messages-container {
            height: 320px;
          }
          
          .bubble {
            max-width: 90%;
            font-size: 0.95rem;
            padding: 0.6rem 1rem;
          }
          
          .avatar {
            font-size: 1.2rem;
          }
          
          .input-area {
            flex-direction: column;
            gap: 0.6rem;
          }
          
          .input-area input {
            padding: 0.7rem 0.9rem;
            font-size: 0.95rem;
          }
          
          .input-area button {
            padding: 0.7rem 1.2rem;
            width: 100%;
            justify-content: center;
          }
          
          .sample-questions button {
            font-size: 0.8rem;
            padding: 0.4rem 1rem;
          }
        }
        
        /* ----- MOBILE SMALL ----- */
        @media screen and (max-width: 480px) {
          .day1-container h1 {
            font-size: 1.5rem;
          }
          
          .messages-container {
            height: 280px;
          }
          
          .bubble {
            font-size: 0.9rem;
            padding: 0.5rem 0.8rem;
          }
          
          .empty-state {
            padding: 1rem;
          }
          
          .empty-icon {
            font-size: 2.5rem;
          }
          
          .sample-questions {
            gap: 0.3rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Day1CareerDiscovery;