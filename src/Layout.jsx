import React from 'react';
import { Home_component, Header_component, LoginComponent, SideMenu } from './component/index';

function Layout({ children }) {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50">
        <Header_component />
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Side Menu */}
        <aside className="w-64 bg-white shadow-xl overflow-y-auto">
          <SideMenu />
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;