import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    if (token) {
      const fetchUser = async () => {
        try {
          const response = await axios.get('http://localhost:5000/auth/me', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data);
        } catch (error) {
          if (error.response?.status === 401) {
            console.error('Token expired. Logging out...');
            logout();
          } else {
            console.error('Failed to fetch user:', error);
          }
        }
      };

      fetchUser();

      // Add Axios interceptor for token expiration
      const axiosInterceptor = axios.interceptors.response.use(
        (response) => response,
        async (error) => {
          if (error.response?.status === 401) {
            console.error('Token expired. Logging out...');
            logout();
          }
          return Promise.reject(error);
        }
      );

      // Cleanup interceptor when token changes
      return () => {
        axios.interceptors.response.eject(axiosInterceptor);
      };
    }
  }, [token]);

  const login = (newToken, userData) => {
    localStorage.setItem('token', newToken); // Save token in localStorage
    setToken(newToken); // Update token in state
    setUser(userData); // Set user data during login
  };

  const logout = () => {
    localStorage.removeItem('token'); // Clear token from localStorage
    setToken(''); // Reset token in state
    setUser(null); // Clear user data
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
