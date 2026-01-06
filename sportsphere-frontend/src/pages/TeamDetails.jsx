import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function TeamDetails() {
  const { teamId } = useParams();
  const [team, setTeam] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch individual team data from backend
    fetch(`http://localhost:5000/api/teams/${teamId}`)
      .then(res => res.json())
      .then(data => setTeam(data))
      .catch(err => console.error("Error fetching team details:", err));
  }, [teamId]);

  if (!team) return <div className="container py-5 text-center">Loading...</div>;

  return (
    <div className="container py-5">
      <button onClick={() => navigate('/teams')} className="btn btn-sm btn-outline-primary mb-4">
        ← Back to All Teams
      </button>
      
      <div className="sport-card p-5 shadow">
        <h1 className="fw-bold mb-4" style={{ color: '#2189bd' }}>{team.team_name}</h1>
        <div className="row text-center g-4">
          <div className="col-md-4">
            <div className="p-4 bg-light rounded border border-success">
              <h2 className="text-success fw-bold">{team.wins || 0}</h2>
              <p className="mb-0 text-muted small fw-bold">WINS</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-4 bg-light rounded border border-danger">
              <h2 className="text-danger fw-bold">{team.losses || 0}</h2>
              <p className="mb-0 text-muted small fw-bold">LOSSES</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-4 bg-light rounded border">
              <h2 className="text-secondary fw-bold">{team.draws || 0}</h2>
              <p className="mb-0 text-muted small fw-bold">DRAWS</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamDetails;