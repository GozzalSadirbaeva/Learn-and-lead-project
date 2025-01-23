import { Button } from "@mui/material";
import axios from "axios";
import { ErrorMessage, Field, Formik } from "formik";
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import "./Register.css";

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  username: Yup.string()
    .min(2, "Username must contain at least 2 character ")
    .max(30, "Too Long!")
    .required("Username is required"),
  password: Yup.string()
    .min(4, "Password must contain at least 4 character")
    .max(30, "Too Long!")
    .required("Password is required"),
});

const Register = () => {
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    username: "",
    password: "",
  };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const { name, username, password } = values;
      let response = await axios.post(
        "https://nt-shopping-list.onrender.com/api/users",
        {
          name,
          username,
          password,
        }
      );
      console.log(response);
      if (response.status === 201) {
        localStorage.setItem("AccesToken", response.data.token);
        toast.success("Signed in successfully");
        navigate("/main");
      }
    } catch (error) {
      console.error("Error registering user:", error.response || error.message);
      toast.error("Register failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (localStorage.getItem("AccesToken")) {
    return <Navigate to={"/main"} />;
  }
  const cancel = () => {
    navigate("/login");
  };
  return (
    <div className="flex p-20 justify-center">
      <div className="p-2 bg-white rounded-md flex flex-col justify-self-center">
        <img src="./logo2.avif" alt="" className="w-[70%] self-center" />
        <h1 className="bg-gradient text-3xl font-semibold text-center pt-8 pb-3">
          Learn & Lead
        </h1>
      </div>
      <div className="flex flex-col p-10 bg-[#5083ea98] gap-3 rounded-md justify-center">
        <h1 className="text-2xl font-medium text-center pb-4 text-gray-800">
          Register Now
        </h1>
        <Formik
          initialValues={initialValues}
          validationSchema={RegisterSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, handleSubmit }) => (
            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block">
                  Name
                </label>
                <Field
                  type="text"
                  name="name"
                  id="name"
                  className="w-[400px] outline-none rounded-lg py-2 px-1"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="error text-red-500"
                />
              </div>
              <div>
                <label htmlFor="username" className="block">
                  Username
                </label>
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
                <label htmlFor="password" className="block">
                  Password
                </label>
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
              <div className="flex gap-5 text-center justify-center">
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                >
                  Sign up
                </Button>
                <Button
                  onClick={cancel}
                  variant="contained"
                  sx={{ bgcolor: "red" }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
