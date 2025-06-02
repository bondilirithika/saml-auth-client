// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Import components directly with correct paths
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Callback from './components/Callback';
import Profile from './components/Profile';
import ProtectedRoute from './components/ProtectedRoute';

// Add logging to check component imports
console.log("Component types:", {
  Header: typeof Header,
  Home: typeof Home, 
  Login: typeof Login,
  Callback: typeof Callback,
  Profile: typeof Profile,
  ProtectedRoute: typeof ProtectedRoute
});

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/callback" element={<Callback />} />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
        <footer className="bg-light text-center py-3 mt-auto">
          <div className="container">
            <span className="text-muted">SAML Auth Demo &copy; {new Date().getFullYear()}</span>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;