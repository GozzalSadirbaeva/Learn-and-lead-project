import { Button } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { FaRegBell } from "react-icons/fa";
import { FiRefreshCcw } from "react-icons/fi";
import { LuLogOut } from "react-icons/lu";
import { Outlet, useNavigate } from "react-router-dom";
import "./Navbar.css";
const Navbar = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const onChange = async (e) => {
    setSearch(e.target.value);
    let response = await axios.get(
      "https://nt-shopping-list.onrender.com/api/groups/search",
      {
        headers: {
          "x-auth-token": `${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        params: {
          q: search,
        },
      }
    );
    console.log(response);
  };
  return (
    <>
      <div className="flex justify-between items-center bg-[#f6f6f6] py-3 px-6 shadow">
        <div className="flex gap-8">
          <img src="./logo4.jpg" alt="" className="w-10" />
          <Button variant="contained" sx={{ bgcolor: "#2ba1c4" }}>
            + New
          </Button>
        </div>
        <form action="">
          <input
            onChange={onChange}
            type="text"
            placeholder="Search"
            className="w-96 border rounded-md py-1 px-1 outline-none"
          />
        </form>
        <div className="flex gap-6">
          <button>
            <FiRefreshCcw className="" />
          </button>
          <button>
            <FaRegBell />
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            <LuLogOut />
          </button>
        </div>
      </div>

      <Outlet />
    </>
  );
};

export default Navbar;
