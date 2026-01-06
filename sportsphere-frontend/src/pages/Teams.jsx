import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Teams() {
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch teams from the backend
    fetch('http://localhost:5000/api/teams')
      .then(res => res.json())
      .then(data => setTeams(data))
      .catch(err => console.error("Error fetching teams:", err));
  }, []);

  return (
    <div className="container py-5">
      <div className="sport-card p-4 shadow-sm">
        <h2 className="fw-bold mb-4 text-primary-blue">Registered Teams</h2>
        <div className="row g-4">
          {teams.map((team) => (
            <div key={team.id} className="col-md-6">
              {/* This is the clickable card with the hover effect */}
              <div 
                onClick={() => navigate(`/teams/${team.id}`)}
                className="p-4 team-item-card d-flex justify-content-between align-items-center"
              >
                <div>
                  <h5 className="fw-bold mb-1">{team.team_name}</h5>
                  <small className="text-muted">{team.matches_played} Matches Played</small>
                </div>
                <span className="badge bg-primary px-3 py-2">{team.points} Points</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Teams;