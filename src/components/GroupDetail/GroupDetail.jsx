import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./GroupDetail.css";
const GroupDetail = () => {
  const { groupId } = useParams();
  const [group, setGroup] = useState(null);
  const [setting, setSetting] = useState(false);
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
    })();
  }, [groupId]);
  console.log(group);

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
                <button className="p-1 hover:bg-[#f8f9fa]">Add member</button>
                <button className="p-1 hover:bg-[#f8f9fa]">Leave Group</button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex pt-3 gap-16">
        <div className="flex-1 bg-white rounded-md">
          <div className="flex justify-between p-2">
            <h2 className=" text-xl font-semibold">Items</h2>

            <form action="" className="flex gap-2">
              <input
                type="text"
                placeholder="Title"
                className="px-1 py-1 rounded outline-none border"
              />
              <button
                type="submit"
                className="px-3 py-1 bg-[#2ba1c4] rounded text-white text-lg"
              >
                +
              </button>
            </form>
          </div>
        </div>
        <div className="flex-1 bg-white rounded-md">
          <div className="flex justify-between p-2">
            <h2 className=" text-xl font-semibold">Members</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupDetail;
