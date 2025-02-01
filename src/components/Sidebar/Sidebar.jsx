import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
import { Button } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import axios from "axios";
import React, { memo, useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { GroupContext } from "../../context/GroupContext";
import "./Sidebar.css";
const Sidebar = () => {

  const [open, setOpen] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [groups, setGroups] = useContext(GroupContext);

  const handleClick = () => {
    setOpen(!open);
  };
  const createGroup = () => {
    setIsCreating(!isCreating);
  };
  const onCreateGroup = async (e) => {
    e.preventDefault();
    let response = await axios.post(
      "https://nt-shopping-list.onrender.com/api/groups",
      {
        name: e.target[0].value,
        password: e.target[1].value,
      },
      {
        headers: {
          "x-auth-token": `${localStorage.getItem("AccesToken")}`,
        },
      }
    );
    // console.log(response);

    if (response.status === 201) {
      toast.success(response.data.message);
      setGroups([...groups, response.data.group]);

      setIsCreating(!isCreating);
    }
  };
  return (
    <>
      <div className=" min-h-screen w-68  px-1 bg-white">
        <ListItemButton>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <NavLink to={"/main"}>
            <ListItemText primary="Profile" />
          </NavLink>
        </ListItemButton>
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <GroupsIcon />
          </ListItemIcon>
          <ListItemText primary="Groups" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }} onClick={createGroup}>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              {/* <ListItemText primary="Add group" /> */}
              <button onClick={() => setIsCreating(!isCreating)}>
                Add group
              </button>
              {isCreating && (
                <div className="modal" onClick={() => setIsCreating(false)}>
                  <div
                    className="flex bg-[#e9ecef] p-2 justify-between items-center font-semibold rounded-[10px] border"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <p>Group name and password</p>
                    <button onClick={() => setIsCreating(false)}>
                      <CloseIcon />
                    </button>
                  </div>
                  <form
                    action=""
                    onSubmit={onCreateGroup}
                    className="p-2 flex flex-col gap-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      type="text"
                      placeholder="Group name"
                      className="border px-1 py-[6px] w-full rounded"
                    />
                    <input
                      type="password"
                      placeholder="Group password"
                      className="border px-1 py-[6px] w-full rounded"
                    />
                    <div className="flex gap-5 justify-around pt-2">
                      <Button type="submit" variant="contained">
                        Submit
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => setIsCreating(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </div>
              )}
            </ListItemButton>

            <div>
              <div className="flex flex-col p-3 gap-3 pl-9">
                {groups.map((group) => (
                  <div
                    key={group._id}
                    className=" w-full py-[6px] px-2 rounded-lg bg-[#e9ecef90] hover:bg-[#d3d4d5]"
                  >
                    <NavLink to={`/main/groups/${group._id}`}>
                      {group.name}
                    </NavLink>
                  </div>
                ))}
              </div>
            </div>
          </List>
        </Collapse>
      </div>
    </>
  );
};

export default memo(Sidebar);
