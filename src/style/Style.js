import { Box, Button, Chip, Paper, styled, Typography } from "@mui/material";

export const StyledText = styled(Typography)({
  fontSize: "3rem",
  fontWeight: 700,
});

export const StyledHeader = styled(Chip)({
  fontSize: "1.5rem",
  fontWeight: 500,
  background: "none",
  color: "#343a40",
});

export const StyledUserInfo = styled(Typography)({
  fontSize: "1rem",
  fontWeight: 700,
  background: "none",
  color: "#868e96",
});

export const StyledTableHeadersText = styled(Typography)({
  fontSize: "1rem",
  fontWeight: 500,
  color: "#e9ecef",
});

export const StyledTableBodyText = styled(Typography)({
  fontSize: "1rem",
  fontWeight: 800,
  color: "#343a40",
});

export const StyledSalesText = styled(Typography)({
  fontSize: "1.2rem",
  fontWeight: 700,
  color: "#212829",
});

export const StyledSalesTextLight = styled(Typography)({
  fontSize: "1rem",
  fontWeight: 500,
  color: "#868e96",
});

export const StyledCustomerCard = styled(Paper)({
  padding: "1rem 2rem",
  borderLeft: "5px solid #6741d9",
  minWidth:"17rem"
});

export const StyledSalesCardContainer = styled(Box)({
  display: "flex",
  padding: "2rem",
  flexDirection: "column",
  gap: "1rem",
  background: "#f8f9fa",
  borderRadius: "15px",
});

export const StyledSalesCard = styled(Paper)({
  width: "15rem",
  padding: "1rem",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  borderRadius: "15px",
});

export const StyledButton = styled(Button)({
  backgroundColor: "#6741d9",
  textTransform: "none",
  fontFamily: "'Nunito', sans-serif",
  "&:hover": {
    backgroundColor: "#7950f2",
  },
});

export const StyledLegendIcon = styled("div")({
  height: "10px",
  width: "10px",
  borderRadius: "50%",
});

export const StyledChartLegend = styled(Paper)({
  borderRadius: "15px",
  backgroundColor: "#f8f9fa",
  padding: "0.5rem 1rem",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "0.5rem",
});

export const StyledModal = styled(Paper)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "#fff",
  color: "#000",
  borderRadius:"15px",
  padding:"2rem",
  borderLeft:"5px solid #000"
});
