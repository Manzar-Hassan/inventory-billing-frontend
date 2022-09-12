import { Button, Container, Stack } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Stack
        sx={{
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          flexDirection: "column",
        }}
      >
        <img
          src="./assets/error.png"
          style={{ height: "300px", width: "300px" }}
          alt="Error Page"
        />
        <Button onClick={() => navigate("/")}>Return to Billing Page</Button>
      </Stack>
    </Container>
  );
};

export default Error;
