
import Components from './component/index';
const {HeaderComponent, SideMenuComponent} = Components;
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Sticky Header */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <HeaderComponent />
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 pt-20">
        {" "}
        {/* Add top padding to account for fixed header */}
        <aside className="hidden md:block w-64 bg-white border-r-2 border-t-2 fixed left-0 top-20 bottom-0">
          <SideMenuComponent />
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto  ml-0 md:ml-64">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
