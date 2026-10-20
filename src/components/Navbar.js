import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../logo.png"; // ← Add this line

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img 
          src={logo} 
          alt="Bible Learn Logo" 
          style={{ height: "38px", width: "auto" }} 
        />
        <span>Bible Learn</span>
      </Link>

      <div className="nav-links">
        {user ? (
          <>
            <Link to="/bible">Bible</Link>
            <Link to="/profile">Profile</Link>
            <button onClick={handleLogout} className="btn-logout">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup" className="btn primary" style={{ padding: "0.45rem 1.1rem", fontSize: "0.9rem" }}>
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}