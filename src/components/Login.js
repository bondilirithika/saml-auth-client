// src/components/Login.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

const Login = () => {
  // If already logged in, redirect to profile
  if (AuthService.isAuthenticated()) {
    return <Navigate to="/profile" />;
  }

  const handleLogin = () => {
    console.log("Login button clicked, redirecting to auth service...");
    AuthService.login();
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">Login</h3>
            </div>
            <div className="card-body">
              <div className="text-center mb-4">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" 
                  alt="Google Logo" 
                  width="50" 
                />
              </div>
              <p>
                Click the button below to authenticate with Google Workspace using SAML.
                You'll be redirected to Google's login page.
              </p>
              <button
                className="btn btn-primary btn-lg w-100 mt-3"
                onClick={handleLogin}
              >
                Login with Google Workspace
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;