import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext.jsx';
import { RequireAuth, RequireRole } from './components/ProtectedRoute.jsx';

import Layout from './components/Layout.jsx';
import StudentDashboard from './pages/StudentDashboard.jsx';
import Profile from './pages/Profile.jsx';
import Attendance from './pages/Attendance.jsx';
import Complaints from './pages/Complaints.jsx';
import SocialFeed from './pages/SocialFeed.jsx';
import AIAssistant from './pages/AIAssistant.jsx';
import FacultyAdmin from './pages/FacultyAdmin.jsx';
import Gamification from './pages/Gamification.jsx';
import NotFound from './pages/NotFound.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import RoleIndex from './pages/RoleIndex.jsx';

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* App layout */}
        <Route element={<Layout />}>
          <Route element={<RequireAuth />}>
            {/* Index: redirect to role home */}
            <Route index element={<RoleIndex />} />

            {/* Student-only routes */}
            <Route element={<RequireRole roles={['student']} />}>
              <Route path="student" element={<StudentDashboard />} />
              <Route path="profile" element={<Profile />} />
              <Route path="attendance" element={<Attendance />} />
              <Route path="complaints" element={<Complaints />} />
              <Route path="gamification" element={<Gamification />} />
            </Route>

            {/* Shared routes (both roles) */}
            <Route path="feed" element={<SocialFeed />} />
            <Route path="ai" element={<AIAssistant />} />

            {/* Faculty/Admin-only */}
            <Route element={<RequireRole roles={['faculty', 'admin']} />}>
              <Route path="admin" element={<FacultyAdmin />} />
            </Route>
          </Route>

          {/* 404 within layout */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}