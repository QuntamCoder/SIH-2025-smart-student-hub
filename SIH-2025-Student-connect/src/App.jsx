import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Profile from './pages/Profile.jsx';
import Attendance from './pages/Attendance.jsx';
import Complaints from './pages/Complaints.jsx';
import SocialFeed from './pages/SocialFeed.jsx';
import AIAssistant from './pages/AIAssistant.jsx';
import FacultyAdmin from './pages/FacultyAdmin.jsx';
import Gamification from './pages/Gamification.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="complaints" element={<Complaints />} />
        <Route path="feed" element={<SocialFeed />} />
        <Route path="ai" element={<AIAssistant />} />
        <Route path="admin" element={<FacultyAdmin />} />
        <Route path="gamification" element={<Gamification />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}