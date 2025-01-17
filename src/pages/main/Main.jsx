import React from "react";
import { Navigate } from "react-router-dom";

const Main = () => {
  if (!localStorage.getItem("token")) {
    return <Navigate to={"/login"} />;
  }
  return <div>Main</div>;
};

export default Main;
