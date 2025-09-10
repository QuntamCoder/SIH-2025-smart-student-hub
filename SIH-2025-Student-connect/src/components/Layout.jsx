import { Outlet } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Sidebar from './Sidebar.jsx';

export default function Layout() {
  return (
    <div className="container">
      <aside className="sidebar">
        <Sidebar />
      </aside>
      <main className="main">
        <header className="navbar">
          <Navbar />
        </header>
        <section className="content">
          <Outlet />
        </section>
      </main>
    </div>
  );
}