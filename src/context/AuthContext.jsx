import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    if (token) {
      const fetchUser = async () => {
        try {
          const response = await fetch('http://localhost:5000/auth/me', {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (response.ok) {
            const data = await response.json();
            setUser(data); // Set the user data if the token is valid
          } else {
            console.error('Failed to fetch user: Invalid token');
            logout(); // Clear invalid token and user data
          }
        } catch (error) {
          console.error('Failed to fetch user:', error);
        }
      };
      fetchUser();
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
    <AuthContext.Provider value={{ user, token, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
