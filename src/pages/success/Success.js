import { Stack } from "@mui/material";
import React from "react";
import { BiCheck } from "react-icons/bi";
import { Link } from "react-router-dom";
import { StyledText } from "../../style/Style";

const Success = () => {
  return (
    <>
      <Stack
        sx={{
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          width: "100vw",
          height: "100vh",
        }}
      >
        <BiCheck style={{ color: "green", height: "10rem", width: "10rem" }} />
        <StyledText variant="h4" sx={{ fontSize: "1.5rem" }}>
          Thanks for Shopping...
        </StyledText>
        <Link to="/" style={{textDecoration:"none"}}>Back to Billing page</Link>
      </Stack>
    </>
  );
};

export default Success;
