import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Teams from './pages/Teams.jsx';
import TeamDetails from './pages/TeamDetails.jsx';
import Fixtures from './pages/Fixtures.jsx';
import Scoreboard from './pages/Scoreboard.jsx';
import Leaderboard from './pages/Leaderboard.jsx';
import Login from './pages/Login.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('adminToken') === 'true');

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    localStorage.setItem('adminToken', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('adminToken');
  };

  return (
    <Router>
      {/* 1. The Navbar is now placed here so it can see the URL directly */}
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
          <Route path="/teams" element={<Teams isLoggedIn={isLoggedIn} />} />
          <Route path="/teams/:teamId" element={<TeamDetails />} />
          <Route path="/fixtures" element={<Fixtures />} />
          <Route path="/scoreboard" element={<Scoreboard />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/login" element={<Login onLogin={handleLoginSuccess} />} />
          <Route 
            path="/admin-dashboard" 
            element={isLoggedIn ? <AdminDashboard /> : <Navigate to="/login" />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;