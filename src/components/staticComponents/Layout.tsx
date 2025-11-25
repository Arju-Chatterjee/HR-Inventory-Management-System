import { useState, type FC } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout: FC = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isExpanded={sidebarVisible} onToggleSidebar={toggleSidebar} />

      <div className="flex-1 flex flex-col">
        <Navbar sidebarToggled={sidebarVisible} />
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
