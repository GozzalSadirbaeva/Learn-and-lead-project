import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import React, { memo, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GroupContext } from "../../context/GroupContext";

const Main = () => {
  const navigate = useNavigate();
  const [groups, setGroups, me, setMe] = useContext(GroupContext);
  // console.log(me, "meeee");
  const delAccount = async () => {
    try {
      let res = await axios.delete(
        `https://nt-shopping-list.onrender.com/api/users`,
        {
          headers: {
            "x-auth-token": `${localStorage.getItem("AccesToken")}`,
          },
        }
      );
      console.log(res);
      toast.success(res.data.message);
      localStorage.removeItem("AccesToken")
      navigate("/");
    } catch (error) {
      console.log(error);
      // toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <div className="bg-white m-5 p-5 rounded-lg">
        <div className="flex justify-between">
          <h1 className="text-3xl font-semibold">Your profile</h1>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-[#2ba1c4] text-white rounded-md justify-center flex">
              <ContentCopyIcon />
              Copy Username
            </button>
            <button
              onClick={delAccount}
              className="px-3 py-1 bg-red-500 text-white rounded-md justify-center flex"
            >
              <DeleteIcon /> Delete Account
            </button>
          </div>
        </div>
        <div className="pt-5 flex gap-5">
          <img
            src="./ava.jpg"
            alt=""
            className="w-28 border rounded-full bg-slate-200"
          />
          <div>
            <p className="text-3xl font-semibold">{me.name} </p>
            <p className="text-lg font-normal pt-2">{me.username} </p>
          </div>
          <div>
            <button className="bg-[#70a046] text-white rounded-md font-medium border px-2 py-1">
              {me.status}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Main);
