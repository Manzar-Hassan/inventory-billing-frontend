import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { FaShopware } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#000" }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="logo"
          onClick={() => navigate("/bill")}
        >
          <FaShopware />
        </IconButton>
        <Typography
          component="div"
          sx={{ flexGrow: 1, cursor: "pointer" }}
          onClick={() => navigate("/bill")}
        >
          My mart
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button color="inherit" onClick={()=>navigate("/bill")}>Bill</Button>
          <Button color="inherit" onClick={()=>navigate("/sales")}>Sales</Button>
          <Stack direction="row" sx={{ alignItems: "center" }}>
            <Avatar
              src="https://picsum.photos/50/50"
              alt="profile pic"
              sx={{ height: "1.5rem", width: "1.5rem" }}
            />
            <Button
              onClick={handleClick}
              id="profile--button"
              aria-controls={open ? "profile--menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              color="inherit"
            >
              Admin
            </Button>
            <Menu
              anchorEl={anchorEl}
              id="profile--menu"
              open={open}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <AiOutlineLogout color="red" />
                  <Typography>logout</Typography>
                </Box>
              </MenuItem>
            </Menu>
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
