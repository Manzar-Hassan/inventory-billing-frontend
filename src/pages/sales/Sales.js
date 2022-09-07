import React from "react";
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

const cards = [1, 2, 3, 4];

const Sales = () => {
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
          {cards.map((card, index) => (
            <SalesCard key={index} />
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
                Marketing
              </Typography>
            </StyledChartLegend>
            <StyledChartLegend>
              <StyledLegendIcon sx={{ backgroundColor: "#4e73df" }} />
              <Typography
                sx={{ fontSize: "0.7rem", fontWeight: 700, color: "#212829" }}
              >
                Sales
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
