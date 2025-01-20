import { Button } from "@mui/material";
import axios from "axios";
import { ErrorMessage, Field, Formik } from "formik";
import React from "react";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Username must contain at least 2 character ")
    .max(15, "Too Long!")
    .required("Username is required"),
  password: Yup.string()
    .min(4, "Password must contain at least 4 character")
    .max(20, "Too Long!")
    .required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const initialValues = {
    username: "",
    password: "",
  };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const { username, password } = values;
      const response = await axios.post(
        "https://nt-shopping-list.onrender.com/api/auth",
        { username, password }
      );

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        toast.success("Signed in successfully");
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Login failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (localStorage.getItem("token")) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex p-20 justify-center">
      <div className="p-2 bg-white rounded-md flex flex-col justify-self-center">
        <img src="./logo2.avif" alt="Logo" className="w-[70%] self-center" />
        <h1 className="bg-gradient text-3xl font-semibold text-center pt-8 pb-3">
          Learn & Lead
        </h1>
      </div>
      <div className="flex flex-col bg-[#5083ea98] rounded-md justify-center p-10">
        <h1 className="text-2xl font-medium text-center pb-4 text-gray-800">
          Login
        </h1>
        <Formik
          initialValues={initialValues}
          validationSchema={LoginSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, handleSubmit }) => (
            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">Username</label>
                <Field
                  type="text"
                  name="username"
                  id="username"
                  className="w-[400px] outline-none rounded-lg py-2 px-1"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="error text-red-500"
                />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  className="w-[400px] outline-none rounded-lg py-2 px-1"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error text-red-500"
                />
              </div>
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                className="mt-4 w-[400px]"
              >
                Sign in
              </Button>
            </form>
          )}
        </Formik>
        <div className="flex pt-2 gap-2">
          <p>No account yet?</p>
          <NavLink to="/register">
            <p className="underline">Create one</p>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Login;
