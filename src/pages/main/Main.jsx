import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import { Navigate } from "react-router-dom";
const Main = () => {
  if (!localStorage.getItem("token")) {
    return <Navigate to={"/login"} />;
  }
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
            <button className="px-3 py-1 bg-red-500 text-white rounded-md justify-center flex">
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

          <p className="text-2xl font-semibold"> Test3</p>
          <div>
            <button className="bg-[#70a046] text-white rounded-md font-medium border px-2 py-1">
              Active
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
