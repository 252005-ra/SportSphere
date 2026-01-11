import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="site-nav">
      <div className="container">
        <Link to="/" className="navbar-brand">
          SportSphere
        </Link>

        <div>
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/teams">Teams</Link>
          <Link className="nav-link" to="/fixtures">Fixtures</Link>
          <Link className="nav-link" to="/scoreboard">Scoreboard</Link>
          <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
        </div>

        <Link to="/login" className="nav-auth">
          Login
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
