import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const [teams, setTeams] = useState([]);
  const [liveMatches, setLiveMatches] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [newTeam, setNewTeam] = useState({ name: '', matches: 0, pts: 0 });
  const [popup, setPopup] = useState({ show: false, message: '' });
  const navigate = useNavigate();

  useEffect(() => { fetchData(); }, []);

  const fetchData = () => {
    fetch('http://localhost:5000/api/teams').then(res => res.json()).then(setTeams);
    fetch('http://localhost:5000/api/live-scores').then(res => res.json()).then(setLiveMatches);
  };

  const showPopup = (msg) => {
    setPopup({ show: true, message: msg });
    setTimeout(() => setPopup({ show: false, message: '' }), 3000);
  };

  const startEditing = (match) => {
    setEditingId(match.id);
    setEditData({ ...match });
  };

  const handleSaveMatch = (id) => {
    fetch(`http://localhost:5000/api/admin/scores/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        score1: editData.score1, 
        score2: editData.score2, 
        summary: editData.summary 
      })
    }).then(() => {
      setEditingId(null);
      fetchData();
      showPopup("Changes Saved.");
    }).catch(err => console.error("Save Error:", err));
  };

  const handleDeleteTeam = (id) => {
    if(window.confirm("Are you sure you want to delete this team?")) {
      fetch(`http://localhost:5000/api/admin/teams/${id}`, { method: 'DELETE' })
        .then(() => {
          fetchData();
          showPopup("Team Deleted Successfully.");
        });
    }
  };

  const handleAddTeam = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/api/admin/teams', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ team_name: newTeam.name, matches_played: newTeam.matches, points: newTeam.pts })
    }).then(() => {
      setNewTeam({ name: '', matches: 0, pts: 0 });
      fetchData();
      showPopup("New Team Added.");
    });
  };

  return (
    <div className="container py-5 position-relative">
      {/* Dynamic Popup Message */}
      {popup.show && (
        <div className="position-fixed top-0 start-50 translate-middle-x mt-3 shadow-lg p-3 rounded fw-bold text-white" 
             style={{ backgroundColor: '#2189bd', zIndex: 9999 }}>
          {popup.message}
        </div>
      )}

      <div className="mb-5">
        <h2 className="fw-bold text-primary-blue">Admin Control Panel</h2>
      </div>

      <div className="row g-4">
        {/* Update Live Matches Section */}
        <div className="col-12">
          <div className="sport-card p-4 shadow-sm mb-4">
            <h5 className="fw-bold mb-4 text-dark">Update Live Matches</h5>
            {liveMatches.map(m => (
              <div key={m.id} className="row g-2 mb-3 align-items-center border-bottom pb-3">
                <div className="col-md-2 fw-bold">{m.team1} vs {m.team2}</div>
                
                {editingId === m.id ? (
                  <>
                    <div className="col-md-2">
                      <input className="form-control form-control-sm" value={editData.score1} onChange={e => setEditData({...editData, score1: e.target.value})} />
                    </div>
                    <div className="col-md-2">
                      <input className="form-control form-control-sm" value={editData.score2} onChange={e => setEditData({...editData, score2: e.target.value})} />
                    </div>
                    <div className="col-md-4">
                      <input className="form-control form-control-sm" value={editData.summary} onChange={e => setEditData({...editData, summary: e.target.value})} />
                    </div>
                    <div className="col-md-2 d-flex gap-2">
                      <button className="btn btn-success btn-sm w-100 fw-bold" onClick={() => handleSaveMatch(m.id)}>Save</button>
                      <button className="btn btn-secondary btn-sm w-100 fw-bold" onClick={() => setEditingId(null)}>Cancel</button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="col-md-2 text-muted">{m.score1}</div>
                    <div className="col-md-2 text-muted">{m.score2}</div>
                    <div className="col-md-4 text-muted small">{m.summary}</div>
                    <div className="col-md-2">
                      <button className="btn btn-outline-primary btn-sm w-100 fw-bold" onClick={() => startEditing(m)}>Edit</button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Add Team Section */}
        <div className="col-md-4">
          <div className="sport-card p-4 shadow-sm">
            <h5 className="fw-bold mb-3 text-dark">Add New Team</h5>
            <form onSubmit={handleAddTeam}>
              <div className="mb-2">
                <input type="text" className="form-control" placeholder="Team Name" value={newTeam.name} onChange={e => setNewTeam({...newTeam, name: e.target.value})} required />
              </div>
              <div className="mb-2 text-muted small">Matches Played:
                <input type="number" className="form-control mt-1" value={newTeam.matches} onChange={e => setNewTeam({...newTeam, matches: e.target.value})} />
              </div>
              <div className="mb-3 text-muted small">Points:
                <input type="number" className="form-control mt-1" value={newTeam.pts} onChange={e => setNewTeam({...newTeam, pts: e.target.value})} />
              </div>
              <button className="btn btn-primary w-100 fw-bold">Add Team</button>
            </form>
          </div>
        </div>

        {/* Manage Teams Section */}
        <div className="col-md-8">
          <div className="sport-card p-4 shadow-sm">
            <h5 className="fw-bold mb-3 text-dark">Manage Teams</h5>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Team Name</th>
                    <th>Points</th>
                    <th className="text-end">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map(t => (
                    <tr key={t.id}>
                      <td className="align-middle">{t.team_name}</td>
                      <td className="align-middle fw-bold">{t.points}</td>
                      <td className="text-end">
                        <button onClick={() => handleDeleteTeam(t.id)} className="btn btn-sm btn-outline-danger px-3 fw-bold">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;