import Diversity2Icon from "@mui/icons-material/Diversity2";
import React from "react";
import { FaUser } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <div className=" min-h-screen w-68  px-1 bg-white">
        <div className=" flex flex-col gap-4 relative text-left pt-7 px-3">
          <NavLink to={"/"}>
            <button className="flex items-center gap-3 text-lg w-full py-1 px-2 rounded-md justify-start bg-[#f6f6f6] hover:bg-slate-100">
              <FaUser className="" />
              Profile
            </button>
          </NavLink>
          {/* <NavLink to={"/"}></NavLink> */}
          <button className="flex justify-start items-center w-full gap-3 text-lg py-1 px-2 rounded-md bg-[#f6f6f6] hover:bg-slate-100">
            <Diversity2Icon /> Group
          </button>
        </div>
      </div>

      <Outlet />
    </>
  );
};

export default Sidebar;
