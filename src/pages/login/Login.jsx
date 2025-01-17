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
      <form action="" onSubmit={onSubmit}>
        <input type="text" placeholder="Login" />
        <input type="password" placeholder="Password" />
        <button>Submit</button>
      </form>
      <div>
        <p>No account yet?</p>
        <NavLink to={"/register"}>Create one</NavLink>
      </div>
    </div>
  );
};

export default Login;
