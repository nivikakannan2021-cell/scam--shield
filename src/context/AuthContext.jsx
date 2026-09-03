import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const STORAGE_KEY = 'scamshield_auth_user';

export function AuthProvider({ children }) {
  // Initialize with persisted user or default demo user
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to read user from localStorage", e);
    }
    // Default mock user
    return {
      id: "usr-9481",
      name: "Alex Morgan",
      email: "alex.morgan@scamshield.io",
      role: "Security Analyst",
      company: "Sentinel Shield Lab",
      avatarInitials: "AM"
    };
  });

  const [isAuthenticated, setIsAuthenticated] = useState(!!user);

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem(STORAGE_KEY);
      setIsAuthenticated(false);
    }
  }, [user]);

  const login = (email, password) => {
    const nameFromEmail = email.split('@')[0] || "User";
    const formattedName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);
    const initials = (formattedName.slice(0, 2)).toUpperCase();

    const loggedUser = {
      id: `usr-${Date.now().toString().slice(-4)}`,
      name: formattedName,
      email: email || "user@scamshield.io",
      role: "Cybersecurity User",
      company: "Personal Account",
      avatarInitials: initials
    };

    setUser(loggedUser);
    return true;
  };

  const signup = (name, email, password) => {
    const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || "US";
    const newUser = {
      id: `usr-${Date.now().toString().slice(-4)}`,
      name: name || "New Member",
      email: email || "member@scamshield.io",
      role: "Verified Member",
      company: "Personal Shield",
      avatarInitials: initials
    };

    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const updateUser = (updates) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
