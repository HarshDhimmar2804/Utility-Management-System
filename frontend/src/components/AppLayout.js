import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const AppLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 bg-white border-r border-gray-200 shadow-md">
          <Sidebar />
        </aside>
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="container mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
