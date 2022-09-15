import React from "react";
import { Box, Stack } from "@mui/material";
import { IoResizeSharp } from "react-icons/io5";
import {
  StyledSalesCard,
  StyledSalesText,
  StyledSalesTextLight,
} from "../../style/Style";
import { BiUpArrowAlt } from "react-icons/bi";

const SalesCard = ({product}) => {
  return (
    <StyledSalesCard>
      <Stack
        direction="row"
        justifyContent="space-between"
        width="100%"
        mb="1rem"
      >
        <StyledSalesTextLight sx={{color:"#495057"}}>{product.item}</StyledSalesTextLight>
        <IoResizeSharp style={{ color: "#868e96" }} />
      </Stack>
      <Stack direction="row" justifyContent="space-evenly" width="100%">
        <StyledSalesText>₹48.8k</StyledSalesText>
        <Box
          sx={{
            color: "#37b24d",
            backgroundColor: "#d3f9d8",
            display: "flex",
            alignItems: "center",
            borderRadius: "15px",
            padding: "0 0.5rem",
            fontSize:"0.7rem"
          }}
        >
          +3.4%
          <BiUpArrowAlt />
        </Box>
      </Stack>
      <StyledSalesTextLight
        sx={{ fontSize: "0.8rem", marginRight: "3.5rem", marginTop: "0.5rem" }}
      >
        {product.item} left {product.stock}
      </StyledSalesTextLight>
    </StyledSalesCard>
  );
};

export default SalesCard;
