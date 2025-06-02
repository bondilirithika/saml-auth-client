// src/components/Callback.js
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

const Callback = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        console.log("Starting callback processing...");
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        const state = params.get('state');
        
        console.log("Token received:", token ? token.substring(0, 15) + '...' : 'none');
        console.log("State received:", state);
        console.log("Stored state:", localStorage.getItem('auth_state'));
        
        if (!token) {
          setError('No token received from authentication provider');
          setLoading(false);
          return;
        }
        
        // Process the token and verify state
        console.log("Calling AuthService.handleCallback...");
        const success = AuthService.handleCallback(token, state);
        console.log("handleCallback result:", success);
        
        if (success) {
          // Validate token with the server
          console.log("Validating token with server...");
          const validation = await AuthService.validateToken(token);
          console.log("Validation result:", validation);
          
          if (validation.valid) {
            console.log("Token is valid, navigating to profile...");
            navigate('/profile');
          } else {
            console.error("Token validation failed:", validation.error);
            setError('Token validation failed: ' + (validation.error || 'Unknown error'));
            setLoading(false);
          }
        } else {
          console.error("Failed to process authentication response");
          setError('Failed to process authentication response');
          setLoading(false);
        }
      } catch (err) {
        console.error("Error in callback:", err);
        setError(err.message || 'An error occurred during authentication');
        setLoading(false);
      }
    };
    
    handleCallback();
  }, [location, navigate]);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Processing authentication response...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          <h4>Authentication Error</h4>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={() => navigate('/login')}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default Callback;