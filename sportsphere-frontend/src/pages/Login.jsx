import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleAdminLogin = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        onLogin();
        navigate('/'); // Redirect to Home as admin
      } else {
        alert("Invalid Admin Credentials!");
      }
    });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="sport-card p-5 shadow-sm" style={{ maxWidth: '450px', width: '100%', borderTop: '4px solid #2189bd' }}>
        <h2 className="fw-bold text-center text-primary-blue mb-4">Admin Login</h2>
        <form onSubmit={handleAdminLogin}>
          <div className="mb-3">
            <label className="form-label small fw-bold">Username</label>
            <input type="text" className="form-control" onChange={e => setCredentials({...credentials, username: e.target.value})} required />
          </div>
          <div className="mb-4">
            <label className="form-label small fw-bold">Password</label>
            <input type="password" className="form-control" onChange={e => setCredentials({...credentials, password: e.target.value})} required />
          </div>
          <button className="btn btn-primary w-100 py-2 fw-bold">Log In as Admin</button>
        </form>
        <div className="text-center mt-3">
           <button onClick={() => navigate('/')} className="btn btn-link text-muted">Continue as Guest</button>
        </div>
      </div>
    </div>
  );
}

export default Login;