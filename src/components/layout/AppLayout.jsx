import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AppSidebar from './AppSidebar';
import AppHeader from './AppHeader';

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-container">
      {/* Backdrop overlay for mobile drawer */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            zIndex: 90,
            backdropFilter: "blur(4px)"
          }}
        />
      )}

      {/* Sidebar navigation */}
      <AppSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main SaaS Content Area */}
      <div className="app-main">
        <AppHeader onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="app-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
