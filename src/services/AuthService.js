// src/services/AuthService.js
import axios from 'axios';
import jwt_decode from 'jwt-decode';

// Configuration constants
const API_URL = 'https://aca9-2405-201-c00b-703c-44e-9432-b3c5-859a.ngrok-free.app';
const CLIENT_ID = 'app1';
const REDIRECT_URI = 'http://localhost:3000/callback';
const API_KEY = 'react-app-api-key';

/**
 * Enterprise Authentication Service
 * Handles SAML-based authentication flow with token management
 */
class AuthService {
  /**
   * Initiates SAML authentication by redirecting to auth server
   * with proper parameters for client identification and CSRF protection
   */
  login() {
    // Generate cryptographically secure state for CSRF protection
    const state = this.generateRandomState();
    localStorage.setItem('auth_state', state);
    
    // Construct authentication URL with all required parameters
    const authUrl = new URL(`${API_URL}/auth`);
    authUrl.searchParams.append('clientId', CLIENT_ID);
    authUrl.searchParams.append('state', state);
    authUrl.searchParams.append('redirect_uri', REDIRECT_URI);
    authUrl.searchParams.append('apiKey', API_KEY);
    
    // Log and redirect to SAML auth service
    console.log("Authentication initiated, redirecting to:", authUrl.toString());
    window.location.href = authUrl.toString();
  }
  
  /**
   * Handles the authentication callback
   * Verifies state to prevent CSRF attacks and stores the token
   * 
   * @param {string} token - JWT token from authentication provider
   * @param {string} state - State parameter for CSRF verification
   * @returns {boolean} Success of token handling
   */
  handleCallback(token, state) {
    // Verify state to prevent CSRF attacks
    const storedState = localStorage.getItem('auth_state');
    if (state && state !== storedState) {
      throw new Error('State mismatch - potential security issue');
    }
    
    // Clear state after verification
    localStorage.removeItem('auth_state');
    
    // Store the token securely
    if (token) {
      localStorage.setItem('auth_token', token);
      return true;
    }
    
    return false;
  }
  
  /**
   * Validates token with the auth service
   * 
   * @param {string} token - JWT token to validate
   * @returns {Promise<Object>} Validation result
   */
  async validateToken(token) {
    try {
      const response = await axios.post(
        `${API_URL}/api/token/validate`, 
        { token },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': API_KEY
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Token validation failed:', error);
      return { 
        valid: false, 
        error: error.response?.data?.message || 'Token validation failed'
      };
    }
  }
  
  /**
   * Gets the current user information from the stored token
   * 
   * @returns {Object|null} User information or null if not authenticated
   */
  getCurrentUser() {
    const token = this.getAuthToken();
    if (!token) return null;
    
    try {
      return jwt_decode(token);
    } catch (error) {
      console.error('Error decoding token:', error);
      this.logout(); // Clear invalid token
      return null;
    }
  }
  
  /**
   * Checks if user is authenticated by verifying token existence and expiration
   * 
   * @returns {boolean} Authentication status
   */
  isAuthenticated() {
    const token = this.getAuthToken();
    if (!token) return false;
    
    try {
      const decoded = jwt_decode(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp > currentTime;
    } catch (error) {
      console.error('Token validation error:', error);
      return false;
    }
  }
  
  /**
   * Logs out the user by removing auth token and redirecting to home
   */
  logout() {
    localStorage.removeItem('auth_token');
    window.location.href = '/';
  }
  
  /**
   * Generates cryptographically secure random state for CSRF protection
   * 
   * @returns {string} Random state value
   */
  generateRandomState() {
    const array = new Uint8Array(16);
    window.crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }
  
  /**
   * Gets the auth token for API calls
   * 
   * @returns {string|null} Auth token or null if not present
   */
  getAuthToken() {
    return localStorage.getItem('auth_token');
  }
}

// Create singleton instance and export
const authService = new AuthService();
export default authService;