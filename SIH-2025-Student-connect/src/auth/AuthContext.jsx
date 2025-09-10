import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);

const seedUsers = [
  { id: 'u1', name: 'Student John', email: 'john@student.edu', password: '123456', role: 'student' },
  { id: 'u2', name: 'Faculty Jane', email: 'jane@college.edu', password: '123456', role: 'faculty' },
  { id: 'u3', name: 'Admin', email: 'admin@college.edu', password: '123456', role: 'admin' },
];

function loadUsers() {
  try {
    const saved = JSON.parse(localStorage.getItem('users') || '[]');
    return [...seedUsers, ...saved];
  } catch {
    return [...seedUsers];
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Load existing session if present
  useEffect(() => {
    const saved = localStorage.getItem('authUser');
    if (saved) {
      try { setUser(JSON.parse(saved)); } catch {}
    }
  }, []);

  const value = useMemo(() => {
    function login(email, password) {
      const users = loadUsers();
      const found = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
      if (!found) throw new Error('Invalid email or password');
      const { password: _pw, ...publicUser } = found;
      localStorage.setItem('authUser', JSON.stringify(publicUser));
      setUser(publicUser);
      return publicUser;
    }

    function logout() {
      localStorage.removeItem('authUser');
      setUser(null);
    }

    function signup({ name, email, password, role }) {
      const users = loadUsers();
      if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
        throw new Error('An account with this email already exists');
      }
      const newUser = { id: 'u_' + Math.random().toString(36).slice(2, 8), name, email, password, role };
      const toSave = JSON.parse(localStorage.getItem('users') || '[]');
      toSave.push(newUser);
      localStorage.setItem('users', JSON.stringify(toSave));
      const { password: _pw, ...publicUser } = newUser;
      localStorage.setItem('authUser', JSON.stringify(publicUser));
      setUser(publicUser);
      return publicUser;
    }

    return { user, login, logout, signup };
  }, [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}