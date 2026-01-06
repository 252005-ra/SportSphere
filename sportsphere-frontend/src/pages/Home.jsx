import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Home({ isLoggedIn }) {
  const [matches, setMatches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchScores = () => {
      fetch('http://localhost:5000/api/live-scores')
        .then(res => res.json())
        .then(data => setMatches(data))
        .catch(err => console.error("Error:", err));
    };
    fetchScores();
    const interval = setInterval(fetchScores, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container py-5">
      <div className="mb-5 d-flex justify-content-between align-items-end">
        <div>
          <h1 className="fw-bold text-primary-blue mb-1">Welcome to SportSphere</h1>
          <p className="text-muted small fw-bold">Cricket Edition • 2025/26 Season</p>
        </div>
        {isLoggedIn && (
          <span className="badge admin-mode-badge p-2 mb-2">Admin Mode Active</span>
        )}
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="d-flex flex-column gap-4">
            {matches.map((match) => (
              <div key={match.id} className="sport-card p-4 shadow-sm">
                
                {/* Header Row: Status and Edit Button side-by-side */}
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div className="small text-muted fw-bold">
                    CRICKET • {match.venue}
                  </div>
                  
                  <div className="d-flex align-items-center gap-2">
                    {isLoggedIn && (
                      <button 
                        onClick={() => navigate('/admin-dashboard')} 
                        className="admin-edit-btn"
                      >
                        Edit Match
                      </button>
                    )}
                    <span className={`small fw-bold ${match.status === 'LIVE' ? 'text-danger' : 'text-primary-blue'}`}>
                      {match.status === 'LIVE' && '● '} {match.status}
                    </span>
                  </div>
                </div>

                <div className="row align-items-center mb-2">
                  <div className="col-4 text-start"><h3 className="fw-bold mb-0">{match.team1}</h3></div>
                  <div className="col-4 text-center">
                    <span className="fs-2 fw-bold">{match.score1}</span>
                    <span className="mx-2 text-muted">-</span>
                    <span className="fs-2 fw-bold text-muted">{match.score2}</span>
                  </div>
                  <div className="col-4 text-end"><h3 className="fw-bold mb-0 text-muted">{match.team2}</h3></div>
                </div>

                <div className="text-center small text-muted mb-3">({match.overs})</div>
                <div className="border-top pt-3 text-center">
                  <span className="fw-bold text-primary-blue small">{match.summary}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-lg-4">
          <h5 className="fw-bold mb-3">Quick Actions</h5>
          <div className="sport-card p-4 shadow-sm">
            <div className="d-flex flex-column gap-3">
              <Link to="/teams" className="btn btn-primary py-2 fw-bold">View Teams</Link>
              <Link to="/fixtures" className="btn btn-outline-primary py-2 fw-bold">View Fixtures</Link>
              <Link to="/leaderboard" className="btn btn-outline-primary py-2 fw-bold">View Leaderboard</Link>
              {isLoggedIn && (
                <Link to="/admin-dashboard" className="btn btn-warning py-2 fw-bold">Admin Dashboard</Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
