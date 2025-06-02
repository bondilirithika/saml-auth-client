// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../services/AuthService';

const Header = () => {
  const currentUser = AuthService.getCurrentUser();
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link to="/" className="navbar-brand">SAML Auth Demo</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link to="/home" className="nav-link">Home</Link>
            </li>
            {currentUser && (
              <li className="nav-item">
                <Link to="/profile" className="nav-link">Profile</Link>
              </li>
            )}
          </ul>
          
          {currentUser ? (
            <ul className="navbar-nav">
              <li className="nav-item">
                <span className="nav-link">
                  {currentUser.email || currentUser.sub}
                </span>
              </li>
              <li className="nav-item">
                <button className="btn btn-link nav-link" onClick={() => AuthService.logout()}>
                  Logout
                </button>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/login" className="nav-link">Login</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;