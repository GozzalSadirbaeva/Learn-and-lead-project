import React from "react";
import { Route, Routes } from "react-router-dom";
import GroupDetail from "./components/GroupDetail/GroupDetail";
import Layout from "./components/Layout/Layout";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/login/Login";
import Main from "./pages/main/Main";
import Register from "./pages/register/Register";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Layout />}>
          <Route path="/main/groups/:groupId" element={<GroupDetail />} />
          <Route path="/main/search/:searchId" element={<Navbar />} />
          <Route
            path="/main/groups/:groupId/members/:memberId"
            element={<GroupDetail />}
          />
          <Route path="/main" element={<Main />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<h1>Not found</h1>} />
      </Routes>
    </div>
  );
};

export default App;
