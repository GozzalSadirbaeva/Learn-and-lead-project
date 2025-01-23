import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
const Layout = () => {
  if (!localStorage.getItem("AccesToken")) {
    return <Navigate to={"/login"} />;
  }
  return (
    <div>
      <Navbar />
      <div className="flex">
        <div className="w-1/5">
          <Sidebar />
        </div>
        <div className="w-4/5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
