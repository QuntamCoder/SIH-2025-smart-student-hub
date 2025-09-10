import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext.jsx';

export default function RoleIndex() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    navigate(user.role === 'student' ? '/student' : '/admin', { replace: true });
  }, [user, navigate]);

  return null; // brief transition state
}