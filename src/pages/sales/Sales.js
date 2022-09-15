import React, { useContext } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { BiDownload } from "react-icons/bi";
import SalesCard from "../../components/salesCard/SalesCard";
import {
  StyledButton,
  StyledChartLegend,
  StyledLegendIcon,
  StyledSalesCardContainer,
  StyledSalesText,
  StyledSalesTextLight,
} from "../../style/Style";
import LineChart from "../../components/chart/LineChart";
import UserSalesRecord from "../../components/modal/UserSalesRecord";
import ShopContext from "../../context/ShopContext";

const Sales = () => {
  const { stock } = useContext(ShopContext);

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box my={3}>
          <StyledSalesText>Hi Admin,</StyledSalesText>
          <StyledSalesTextLight>Welcome back!</StyledSalesTextLight>
        </Box>
        <StyledButton variant="contained" startIcon={<BiDownload />}>
          Download Report
        </StyledButton>
      </Stack>
      <StyledSalesCardContainer mb={5}>
        <StyledSalesText>Analytics Overview</StyledSalesText>
        <Stack
          direction="row"
          alignItems="center"
          flexWrap="wrap"
          justifyContent="space-evenly"
          gap={3}
        >
          {stock.map((product, index) => (
            <SalesCard key={index} product={product}/>
          ))}
        </Stack>
      </StyledSalesCardContainer>
      <StyledSalesCardContainer>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <StyledSalesText>Sales Statistics</StyledSalesText>
          <Stack direction="row" gap={2}>
            <StyledChartLegend>
              <StyledLegendIcon sx={{ backgroundColor: "#22b8cf" }} />
              <Typography
                sx={{ fontSize: "0.7rem", fontWeight: 700, color: "#212829" }}
              >
                Last year Sales
              </Typography>
            </StyledChartLegend>
            <StyledChartLegend>
              <StyledLegendIcon sx={{ backgroundColor: "#4e73df" }} />
              <Typography
                sx={{ fontSize: "0.7rem", fontWeight: 700, color: "#212829" }}
              >
                This year Sales
              </Typography>
            </StyledChartLegend>
          </Stack>
        </Stack>
        <LineChart />
      </StyledSalesCardContainer>
      <UserSalesRecord />
    </>
  );
};

export default Sales;
