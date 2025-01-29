import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PendingIcon from "@mui/icons-material/Pending";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import axios from "axios";
import React, { memo, useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./GroupDetail.css";
const GroupDetail = () => {
  const { groupId } = useParams();

  const [group, setGroup] = useState(null);
  const [setting, setSetting] = useState(false);
  const [addMember, setAddMember] = useState(false);
  const [items, setItems] = useState([]);
  const [members, setMembers] = useState([]);
  const [me, setMe] = useState([]);
  const [bought, setBought] = useState(false);
  const [isPending, setIsPending] = useState("");
  useEffect(() => {
    (async function () {
      let response = await axios.get(
        `https://nt-shopping-list.onrender.com/api/groups`,
        {
          headers: {
            "x-auth-token": `${localStorage.getItem("AccesToken")}`,
          },
        }
      );
      let resGroup = response.data.find((val) => val._id === groupId);
      setGroup(resGroup);
      setItems(resGroup.items);
      setMembers(resGroup.members);

      let resme = await axios.get(
        `https://nt-shopping-list.onrender.com/api/auth`,
        {
          headers: {
            "x-auth-token": `${localStorage.getItem("AccesToken")}`,
          },
        }
      );
      setMe(resme.data);
    })();
  }, [groupId, bought]);
  // console.log(group);
  const createItem = async (e) => {
    e.preventDefault();
    let title = e.target[0].value;

    try {
      setIsPending("creating");
      let response = axios.post(
        `https://nt-shopping-list.onrender.com/api/items`,
        {
          title,
          groupId,
        },
        {
          headers: {
            "x-auth-token": `${localStorage.getItem("AccesToken")}`,
          },
        }
      );
      setIsPending("");
      setItems([...items, response.data.item]);
      setMembers([...members, response.data.member]);
      // console.log(items);
    } catch (error) {
      console.log(error);
    }
  };
  const delItem = async (id) => {
    try {
      setIsPending(id);
      let res = await axios.delete(
        `https://nt-shopping-list.onrender.com/api/items/${id}`,
        {
          headers: {
            "x-auth-token": `${localStorage.getItem("AccesToken")}`,
          },
        }
      );
      // console.log(res);
      if (res.status === 200) {
        setIsPending("");
        setItems(items.filter((val) => val._id !== id));
        toast.success(res.data.message);
      }
    } catch (error) {
      setIsPending("");
      console.log(error);
    }
  };
  const delMember = async (id) => {
    try {
      setIsPending(id);
      let res = await axios.delete(
        `https://nt-shopping-list.onrender.com/api/groups/${groupId}/members/${id}`,
        {
          headers: {
            "x-auth-token": `${localStorage.getItem("AccesToken")}`,
          },
        }
      );
      // console.log(res);
      if (res.status === 200) {
        setIsPending("");
        setMembers(members.filter((val) => val._id !== id));
        toast.success(res.data.message);
      }
    } catch (error) {
      setIsPending("");
      console.log(error);
    }
  };
  const leaveGroup = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post(
        `https://nt-shopping-list.onrender.com/api/groups/${groupId}/leave`,
        {},
        {
          headers: {
            "x-auth-token": `${localStorage.getItem("AccesToken")}`,
          },
        }
      );
      // console.log(res);
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  const formatDate = (isoString) => {
    const date = new Date(isoString);

    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${hours}:${minutes},${day}-${month}-${year}`;
  };

  const asBought = async (itemId) => {
    let res = await axios.post(
      `https://nt-shopping-list.onrender.com/api/items/${itemId}/mark-as-bought`,
      {},
      {
        headers: {
          "x-auth-token": `${localStorage.getItem("AccesToken")}`,
        },
      }
    );
    setBought(!bought);
    // console.log(res);
    toast.success(res.data.message);
  };
  const asNotBought = async (itemId) => {
    let res = await axios.delete(
      `https://nt-shopping-list.onrender.com/api/items/${itemId}/mark-as-bought`,
      {
        headers: {
          "x-auth-token": `${localStorage.getItem("AccesToken")}`,
        },
      }
    );
    setBought(!bought);
    // console.log(res);
    toast.success(res.data.message);
  };
  const [searchMembers, setSearchMembers] = useState([]);
  const onChange = async (e) => {
    const query = e.target.value;
    setSearchMembers([]);
    try {
      let response = await axios.get(
        "https://nt-shopping-list.onrender.com/api/users/search",
        {
          headers: {
            "x-auth-token": `${localStorage.getItem("AccesToken")}`,
            "Content-Type": "application/json",
          },
          params: {
            q: query,
          },
        }
      );
      setSearchMembers(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const addNewMember = async (id) => {
    let response = await axios.post(
      `https://nt-shopping-list.onrender.com/api/groups/${id}/members`,
      {},
      {
        headers: {
          "x-auth-token": `${localStorage.getItem("AccesToken")}`,
        },
      }
    );
    setMembers([...members, response.data.member]);

    // console.log(response);
  };
  return (
    <div className="p-5">
      <div className="flex  justify-between items-center">
        <h2 className="text-4xl">{group?.name}</h2>
        <div className="flex items-center gap-2">
          <p className="bg-white px-3 py-1 text-lg rounded-md">
            Owner: {group?.owner?.name} ({group?.owner?.username})
          </p>
          <button
            onClick={() => setSetting(!setting)}
            className="bg-white p-1 rounded"
          >
            <ManageAccountsIcon />
          </button>
          {setting && (
            <div className="setting" onClick={() => setSetting(false)}>
              <div className="flex flex-col gap-1 p-1">
                <button
                  onClick={() => setAddMember(!addMember)}
                  className="p-1 hover:bg-[#f8f9fa]"
                >
                  Add member
                </button>
                <button onClick={leaveGroup} className="p-1 hover:bg-[#f8f9fa]">
                  Leave Group
                </button>
              </div>
            </div>
          )}
          {addMember && (
            <div
              className="add__member p-3"
              onClick={() => setAddMember(false)}
            >
              <div className="flex justify-between items-center">
                <h1 className="font-semibold text-xl p-3">Add Member</h1>
                <button onClick={() => setAddMember(false)}>
                  <CloseIcon />
                </button>
              </div>
              <form
                action=""
                onClick={(e) => e.stopPropagation()}
                onChange={onChange}
              >
                <input
                  type="text"
                  placeholder="Search"
                  className="border px-2 py-1 w-full outline-none rounded mb-2"
                />
              </form>
              <div>
                {Array.isArray(searchMembers) &&
                  searchMembers.map((searchMember) => (
                    <div key={searchMember._id} className="p-2 border rounded">
                      <button onClick={() => addNewMember(searchMember._id)}>
                        {searchMember.name}
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex pt-3 gap-16">
        <div className="flex-1 bg-white rounded-md">
          <div className="flex justify-between p-2">
            <h2 className=" text-xl font-semibold">
              Items
              <span className="px-3 py-1 bg-[#2ba1c4] text-white rounded-md">
                {items?.length}
              </span>
            </h2>

            <form action="" className="flex gap-2" onSubmit={createItem}>
              <input
                type="text"
                placeholder="Title"
                className="px-1 py-1 rounded outline-none border"
              />
              <button
                type="submit"
                className="px-3 py-1 bg-[#2ba1c4] rounded text-white text-lg"
              >
                {isPending === "creating" ? <PendingIcon /> : <AddIcon />}
              </button>
            </form>
          </div>
          <div className="p-2 flex flex-col gap-1">
            {items?.map((item) => (
              <div
                key={item._id}
                className="flex justify-between p-2 border rounded-lg items-center"
              >
                <div className="flex flex-col">
                  <p className="font-semibold text-lg">{item.title}</p>
                  <div className="flex">
                    <p> Created by {item.owner.name} </p>
                    <p>({formatDate(item.createdAt)})</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      if (item.isBought) {
                        return asNotBought(item._id);
                      } else {
                        return asBought(item._id);
                      }
                    }}
                    className="bg-yellow-300 p-1 px-2 rounded-md"
                  >
                    {item.isBought ? (
                      <LocalMallIcon />
                    ) : (
                      <ShoppingCartOutlinedIcon />
                    )}
                  </button>
                  {me._id === group.owner._id ? (
                    <button
                      onClick={() => delItem(item._id)}
                      className="bg-red-500 p-2 rounded-md"
                    >
                      {isPending === item._id ? (
                        <PendingIcon sx={{ color: "white" }} />
                      ) : (
                        <DeleteOutlinedIcon sx={{ color: "white" }} />
                      )}
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 bg-white rounded-md">
          <div className="flex justify-between p-2">
            <h2 className=" text-xl font-semibold">
              Members{" "}
              <span className="px-3 py-1 bg-[#2ba1c4] text-white rounded-md">
                {members?.length}
              </span>
            </h2>
          </div>
          <div className="p-2  flex flex-col gap-2">
            {members?.map((member) => (
              <div
                key={member._id}
                className="p-2 border rounded-lg flex justify-between"
              >
                <div className="">
                  <p>{member.name}</p>
                  <p>{member.username}</p>
                </div>
                {me._id === group.owner._id ? (
                  <button
                    onClick={() => delMember(member._id)}
                    className="bg-red-500 p-2 rounded-md"
                  >
                    <DeleteOutlinedIcon sx={{ color: "white" }} />
                  </button>
                ) : (
                  ""
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(GroupDetail);
