import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { FaShopware } from "react-icons/fa";
import React, { useContext, useRef } from "react";
import ShopContext from "../../context/ShopContext";
import { StyledButton } from "../../style/Style";
import { BiDownload } from "react-icons/bi";
import { useReactToPrint } from "react-to-print";
import { useNavigate } from "react-router-dom";

const Invoice = () => {
  const { stock, singleDataSales, successToast } = useContext(ShopContext);
  const invoiceRef = useRef();
  const navigate = useNavigate();

  const printInvoice = useReactToPrint({
    content: () => invoiceRef.current,
    documentTitle: singleDataSales._id,
    onAfterPrint: () => successToast("Invoice Print successful !!"),
  });

  return (
    <>
      <Container ref={invoiceRef}>
        <div style={{ display: "flex", flexDirection: "column", gap: "5rem" }}>
          <div
            style={{
              marginTop: "3rem",
              display: "flex",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            <FaShopware
              style={{ height: "4rem", width: "4rem", color: "#6741d9" }}
            />
            <Typography
              sx={{ fontSize: "3rem", fontWeight: 800, letterSpacing: 2 }}
            >
              INVOICE
            </Typography>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <Typography sx={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
                {singleDataSales.name}
              </Typography>
              <Typography sx={{ fontWeight: "bold" }}>
                Date Issued: {singleDataSales.date}
              </Typography>
              <Typography sx={{ fontWeight: "bold" }}>
                Invoice Number: {singleDataSales._id}
              </Typography>
            </div>

            <div>
              <Typography sx={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
                My Mart
              </Typography>
              <Typography sx={{ fontWeight: "bold" }}>
                Xyz coloney, abc road
              </Typography>
              <Typography sx={{ fontWeight: "bold" }}>
                Lmn-655443 India
              </Typography>
            </div>
          </div>

          <div>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Items</TableCell>
                  <TableCell align="right" sx={{ fontWeight: "bold" }}>
                    Rate
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: "bold" }}>
                    Quantity
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: "bold" }}>
                    Subtotal
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {singleDataSales.items &&
                  singleDataSales.items.map((pdt, index) => (
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      key={index}
                    >
                      <TableCell component="th" scope="row">
                        {pdt}
                      </TableCell>
                      <TableCell align="right">
                        {
                          stock.filter((product) => product.item === pdt)[0]
                            .sellingPrice
                        }
                      </TableCell>
                      <TableCell align="right">
                        {singleDataSales.quantity[index]}
                      </TableCell>
                      <TableCell align="right">
                        {singleDataSales.quantity[index] *
                          stock.filter((product) => product.item === pdt)[0]
                            .sellingPrice}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>

          <div>
            <Typography sx={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
              Total - Rs.{singleDataSales.totalAmount}
            </Typography>
          </div>
        </div>
      </Container>
      <StyledButton
        sx={{ margin: "3rem 5rem" }}
        variant="contained"
        startIcon={<BiDownload />}
        onClick={printInvoice}
      >
        Print Invoice
      </StyledButton>

      <StyledButton
        sx={{ margin: "3rem 5rem" }}
        variant="contained"
        onClick={() => navigate("/")}
      >
        return to billing
      </StyledButton>
    </>
  );
};

export default Invoice;
