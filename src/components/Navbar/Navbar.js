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
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ShopContext from "../../context/ShopContext";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const { loginUser, setIsLoggedIn } = useContext(ShopContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#000" }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="logo"
          onClick={() => navigate("/")}
        >
          <FaShopware />
        </IconButton>
        <Typography
          component="div"
          sx={{ flexGrow: 1, cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          My mart
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button color="inherit" onClick={() => navigate("/")}>
            Bill
          </Button>
          <Button color="inherit" onClick={() => navigate("/sales")}>
            Sales
          </Button>
          <Stack direction="row" sx={{ alignItems: "center" }}>
            <Avatar
              src="https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/476.jpg"
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
              {loginUser}
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
              <MenuItem onClick={() => setIsLoggedIn(false)}>
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
