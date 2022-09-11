import { Container, useTheme, useMediaQuery } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import BottomNav from "../components/BottomNav/BottomNav";
import Navbar from "../components/Navbar/Navbar";

const SharedComponent = () => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      {!isMatch ? <Navbar /> : <BottomNav />}
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default SharedComponent;
