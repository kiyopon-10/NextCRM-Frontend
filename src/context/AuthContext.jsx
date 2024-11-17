// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication status only once
    fetch('http://localhost:5000/auth/status', {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.isAuthenticated) {
          setIsAuthenticated(true);
          setUser(data.user);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
        setLoading(false); // Stop loading after the fetch
      })
      .catch((error) => {
        setIsAuthenticated(false);  // Handle errors in case the fetch fails
        setUser(null);
        setLoading(false);  // Stop loading after failure
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner or placeholder while checking authentication
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
