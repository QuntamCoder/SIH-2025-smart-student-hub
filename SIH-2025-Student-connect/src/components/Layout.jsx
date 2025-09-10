import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import Navbar from './Navbar.jsx';

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