import { Container } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <Container>sidebar</Container>
      <Outlet />
    </>
  );
};

export default Sidebar;
