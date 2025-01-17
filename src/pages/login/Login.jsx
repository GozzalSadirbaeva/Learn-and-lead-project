import { Button } from "@mui/material";
import axios from "axios";
import React from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let username = e.target[0].value;
      let password = e.target[1].value;
      let response = await axios.post(
        "https://nt-shopping-list.onrender.com/api/auth",
        {
          username,
          password,
        }
      );
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        toast.success("Signed in successfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (localStorage.getItem("token")) {
    return <Navigate to={"/"} />;
  }
  return (
    <div>
      <div className="flex p-20 justify-center">
        <div className="p-2 bg-white rounded-md flex flex-col justify-self-center">
          <img src="./logo2.avif" alt="" className="w-[70%] self-center" />
          <h1 className="bg-gradient text-3xl font-semibold text-center pt-8 pb-3">
            Learn & Lead
          </h1>
        </div>
        <div className="flex flex-col bg-[#5083ea98] rounded-md justify-center p-10">
          <form action="" onSubmit={onSubmit} className="flex flex-col gap-3 ">
            <h1 className="text-2xl font-medium text-center pb-4 text-gray-800">
              Login
            </h1>
            <input
              type="text"
              placeholder="Username"
              className="w-[400px] outline-none rounded-lg py-2 px-1"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-[400px] outline-none rounded-lg py-2 px-1"
            />
            <Button type="submit" variant="contained">
              Sign in
            </Button>
          </form>
          <div className="flex pt-2 gap-2">
            <p>No account yet?</p>
            <NavLink to={"/register"}>
              <p className="underline">Create one</p>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
