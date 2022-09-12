import { MdCalculate } from "react-icons/md";
import { BsFillPersonFill } from "react-icons/bs";
import { FaDollarSign } from "react-icons/fa";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { AiOutlineLogout } from "react-icons/ai";
import {
  BottomNavigation,
  BottomNavigationAction,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import ShopContext from "../../context/ShopContext";

const BottomNav = () => {
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(ShopContext);

  const handleChange = (event, value) => {
    setValue(value);
  };

  return (
    <>
      <BottomNavigation
        sx={{
          width: "100%",
          position: "fixed",
          bottom: 0,
          backgroundColor: "#000",
          zIndex: 10,
        }}
        onChange={handleChange}
        value={value}
        showLabels
      >
        <BottomNavigationAction
          onClick={() => navigate("/")}
          label="Bill"
          icon={<MdCalculate style={{ color: "#fafafa" }} />}
        />
        <BottomNavigationAction
          onClick={() => navigate("/sales")}
          label="sales"
          icon={<FaDollarSign style={{ color: "#fafafa" }} />}
        />
        <BottomNavigationAction
          onClick={(e) => setAnchorEl(e.currentTarget)}
          id="bottomNav--button"
          aria-controls={open ? "profile--menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          color="inherit"
          label="Profile"
          icon={<BsFillPersonFill style={{ color: "#fafafa" }} />}
        />
      </BottomNavigation>
      <Menu
        anchorEl={anchorEl}
        id="bottomNav--menu"
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
    </>
  );
};

export default BottomNav;
