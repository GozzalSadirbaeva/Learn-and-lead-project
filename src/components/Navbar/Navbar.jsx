import CachedIcon from "@mui/icons-material/Cached";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Badge, Button } from "@mui/material";
import axios from "axios";
import React, { memo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  // const { groupId } = useParams();
  // console.log(groupId);

  const [search, setSearch] = useState("");
  const [searchGroups, setSearchGroups] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [password, setPassword] = useState("");
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const onChange = async (e) => {
    setSearch(e.target.value);
    try {
      let response = await axios.get(
        "https://nt-shopping-list.onrender.com/api/groups/search",
        {
          headers: {
            "x-auth-token": `${localStorage.getItem("AccesToken")}`,
            "Content-Type": "application/json",
          },
          params: {
            q: search,
          },
        }
      );
      setSearchGroups(response.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const joinGroup = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post(
        `https://nt-shopping-list.onrender.com/api/groups/${groupId}/join`,
        { password },
        {
          headers: {
            "x-auth-token": `${localStorage.getItem("AccesToken")}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      toast.success(response.data.message);
      setShowPasswordInput(false); // Close modal on success
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to join group");
    }
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
            onClick={() => setIsCreating(!isCreating)}
            type="text"
            placeholder="Search group and join"
            className="w-96 border rounded-md py-1 px-1 outline-none"
          />
        </form>
        {isCreating && (
          <div className="search" onClick={() => setIsCreating(false)}>
            <div className="flex flex-col gap-1 p-1">
              <p className="p-1 hover:bg-[#f8f9fa] text-xl text-left">Groups</p>
              <div className="scroll-container2">
                {Array.isArray(searchGroups) &&
                  searchGroups.map((searchGroup) => (
                    <div
                      key={searchGroup._id}
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 border rounded flex justify-between"
                    >
                      <p>{searchGroup.name}</p>
                      <button
                        className="px-2 py-1 bg-blue-500 text-white rounded-md"
                        onClick={() => setShowPasswordInput(true)}
                      >
                        Join
                      </button>
                    </div>
                  ))}

                {showPasswordInput && (
                  <div
                    className="password"
                    onClick={() => setShowPasswordInput(false)}
                  >
                    <div
                      className="flex bg-[#e9ecef] p-2 justify-between items-center font-semibold rounded-[10px] border "
                      onClick={(e) => e.stopPropagation()}
                    >
                      <p className="mb-3">Group password</p>
                      <button onClick={() => setShowPasswordInput(false)}>
                        <CloseIcon />
                      </button>
                    </div>
                    <form
                      className="p-2 flex flex-col"
                      onSubmit={joinGroup}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        type="password"
                        placeholder="******"
                        className="border px-1 py-[6px] w-full rounded mb-3 outline-none"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <Button type="submit" variant="contained">
                        Join Group
                      </Button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        <div className="flex gap-6">
          <button>
            <CachedIcon />
          </button>
          <Badge color="error" badgeContent={99}>
            <NotificationsIcon />
          </Badge>
          <button
            onClick={() => {
              localStorage.removeItem("AccesToken");
              navigate("/login");
            }}
          >
            <LogoutIcon />
          </button>
        </div>
      </div>
    </>
  );
};

export default memo(Navbar);
