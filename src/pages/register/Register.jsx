import { Button } from "@mui/material";
import axios from "axios";
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let name = e.target[0].value;
      let username = e.target[1].value;
      let password = e.target[2].value;
      let response = await axios.post(
        "https://nt-shopping-list.onrender.com/api/users",
        {
          name,
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      if (response.status === 201) {
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
    <div className="flex p-20 justify-center">
      <div className="p-2 bg-white rounded-md flex flex-col justify-self-center">
        <img src="./logo2.avif" alt="" className="w-[70%] self-center" />
        <h1 className="bg-gradient text-3xl font-semibold text-center pt-8 pb-3">
          Learn & Lead
        </h1>
      </div>
      <form
        action=""
        onSubmit={onSubmit}
        className="flex flex-col p-10 bg-[#5083ea98] gap-3 rounded-md justify-center"
      >
        <input
          type="text"
          placeholder="Name"
          className="w-[400px] outline-none rounded-lg py-2 px-1"
        />
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
        <Button variant="contained">Sign up</Button>
      </form>
    </div>
  );
};

export default Register;
