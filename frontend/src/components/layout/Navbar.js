import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { FaHome, FaPlus, FaUser, FaSignOutAlt } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <FaHome /> RealEstate
        </Link>

        <ul className="navbar-menu">
          <li>
            <Link to="/properties">Browse Properties</Link>
          </li>

          {isAuthenticated ? (
            <>
              <li>
                <Link to="/add-property" className="navbar-add-btn">
                  <FaPlus /> Add Property
                </Link>
              </li>
              <li className="navbar-user">
                <FaUser /> {user?.name}
              </li>
              <li>
                <button onClick={handleLogout} className="navbar-logout-btn">
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="navbar-auth-btn">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="navbar-auth-btn primary">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
