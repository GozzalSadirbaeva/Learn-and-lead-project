import { Button, Container } from "@mui/material";
import React from "react";
import { FaRegBell } from "react-icons/fa";
import { FiRefreshCcw } from "react-icons/fi";
import { IoMdSettings } from "react-icons/io";
import { Outlet, useNavigate } from "react-router-dom";
import "./Navbar.css";
const Navbar = () => {
  const navigate = useNavigate();
  return (
    <>
      <Container className="">
        <div className="flex justify-between items-center bg-white py-3 px-6 shadow">
          <div className="flex gap-8">
            <h1>Logo</h1>
            <Button variant="contained">+ New</Button>
          </div>
          <form action="">
            <input
              type="text"
              placeholder="Search"
              className="w-full border py-1 px-1 outline-none"
            />
          </form>
          <div className="flex gap-6">
            <button>
              <FiRefreshCcw />
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
              <IoMdSettings />
            </button>
          </div>
        </div>
      </Container>
      <Outlet />
    </>
  );
};

export default Navbar;
