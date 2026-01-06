import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Navbar({ isLoggedIn, handleLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Hide the navbar ONLY on the login page
  if (location.pathname === '/login') {
    return null;
  }

  const onLogoutClick = () => {
    handleLogout();
    navigate('/'); 
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary-blue shadow-sm py-3">
      <div className="container">
        {/* Brand Logo */}
        <Link className="navbar-brand fw-bold fs-3" to="/">SportSphere</Link>
        
        {/* Mobile Toggle Button */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Links */}
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav gap-3">
            <li className="nav-item">
              <Link className="nav-link text-white fw-semibold" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white fw-semibold" to="/teams">Teams</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white fw-semibold" to="/fixtures">Fixtures</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white fw-semibold" to="/scoreboard">Scoreboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white fw-semibold" to="/leaderboard">Leaderboard</Link>
            </li>
            
            {/* Show Admin Panel link ONLY when logged in */}
            {isLoggedIn && (
               <li className="nav-item">
                 <Link 
                   className="nav-link text-warning fw-bold border border-warning rounded px-2" 
                   to="/admin-dashboard"
                   style={{ backgroundColor: 'rgba(255, 193, 7, 0.1)' }}
                 >
                   Admin Panel
                 </Link>
               </li>
            )}
          </ul>
        </div>

        {/* Auth Button (Login/Logout) */}
        <div className="d-flex align-items-center">
          {isLoggedIn ? (
            <button 
              onClick={onLogoutClick} 
              className="btn btn-outline-light rounded-pill px-4 fw-bold"
            >
              Logout
            </button>
          ) : (
            <Link 
              to="/login" 
              className="btn btn-outline-light rounded-pill px-4 fw-bold"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
