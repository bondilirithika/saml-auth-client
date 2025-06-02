// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../services/AuthService';

const Home = () => {
  const isAuthenticated = AuthService.isAuthenticated();
  
  return (
    <div className="container mt-5">
      <div className="jumbotron bg-light p-5 rounded">
        <h1>Welcome to SAML Auth Demo</h1>
        <p className="lead">
          This application demonstrates SAML authentication with Google Workspace 
          using a central authentication service.
        </p>
        <hr className="my-4" />
        <p>
          {isAuthenticated 
            ? "You are currently logged in. View your profile to see your details."
            : "You are not logged in. Click the login button to authenticate with Google."}
        </p>
        <div className="mt-4">
          {isAuthenticated ? (
            <Link to="/profile" className="btn btn-primary btn-lg">
              View Profile
            </Link>
          ) : (
            <Link to="/login" className="btn btn-primary btn-lg">
              Login with Google
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;