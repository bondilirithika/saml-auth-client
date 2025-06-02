// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../services/AuthService';

const Home = () => {
  const isAuthenticated = AuthService.isAuthenticated();
  
  const handleLogout = () => {
    AuthService.logout();
  };
  
  return (
    <div className="container mt-5">
      <div className="jumbotron">
        <h1 className="display-4">Welcome to SAML Auth Demo</h1>
        <p className="lead">
          This application demonstrates SAML-based authentication with Google Workspace.
        </p>
        <hr className="my-4" />
        <p>
          Click the button below to authenticate with your Google Workspace account.
        </p>
        <div className="d-flex gap-2">
          {!isAuthenticated ? (
            <Link to="/login" className="btn btn-primary btn-lg">
              Login with Google
            </Link>
          ) : (
            <>
              <Link to="/profile" className="btn btn-success btn-lg">
                View Profile
              </Link>
              <button 
                className="btn btn-outline-danger btn-lg" 
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;