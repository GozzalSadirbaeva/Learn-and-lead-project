import Diversity2Icon from "@mui/icons-material/Diversity2";
import React from "react";
import { FaUser } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
const sidebarData = [
  {
    title: "Profile",
    path: "/",
    icon: <FaUser />,
  },
  {
    title: "Groups",
    path: "/",
    icon: <MdGroups />,
  },
];
const Sidebar = () => {
  return (
    <>
      <div className=" min-h-screen w-68  px-1 bg-white">
        <div className=" flex flex-col gap-4 relative text-left pt-7 px-3">
          {sidebarData.map((item, index) => {
            return (
              <div key={index}>
                <NavLink to={"/"} />
                <div className="flex items-center gap-3 bg-[#f6f6f6] hover:bg-slate-100 py-1 px-2 rounded-md text-xl">
                  <div className="text-lg">{item.icon}</div>
                  <span>{item.title}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Outlet />
    </>
  );
};

export default Sidebar;
