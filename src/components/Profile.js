// src/components/Profile.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    setUser(currentUser);
    setLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    AuthService.logout();
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h3 className="mb-0">User Profile</h3>
          <button 
            className="btn btn-sm btn-light" 
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
        <div className="card-body">
          <div className="mb-4">
            <h4>Identity Information</h4>
            <table className="table">
              <tbody>
                <tr>
                  <td><strong>Subject:</strong></td>
                  <td>{user.sub || 'Not available'}</td>
                </tr>
                <tr>
                  <td><strong>Email:</strong></td>
                  <td>{user.email || 'Not available'}</td>
                </tr>
                <tr>
                  <td><strong>Name:</strong></td>
                  <td>{user.name || 'Not available'}</td>
                </tr>
                {user.iat && (
                  <tr>
                    <td><strong>Token Issued:</strong></td>
                    <td>{new Date(user.iat * 1000).toLocaleString()}</td>
                  </tr>
                )}
                {user.exp && (
                  <tr>
                    <td><strong>Token Expires:</strong></td>
                    <td>{new Date(user.exp * 1000).toLocaleString()}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div>
            <h4>All Claims</h4>
            <pre className="bg-light p-3 rounded">
              {JSON.stringify(user, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;