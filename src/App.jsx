import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Login from "./pages/login/Login";
import Main from "./pages/main/Main";
import Register from "./pages/register/Register";

const App = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex flex-col h-screen">
              <Navbar />

              <div className="flex flex-1">
                <div className="w-1/5  ">
                  <Sidebar />
                </div>

                <div className="w-4/5">
                  <Main />
                </div>
              </div>
            </div>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
