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
        <Route path="/" element={<Navbar />}>
          <Route path="/" element={<Sidebar />}>
            <Route path="/" element={<Main />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
