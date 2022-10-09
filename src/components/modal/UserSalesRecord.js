import {
  Modal,
  Tooltip,
  Fab,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
  IconButton,
} from "@mui/material";
import { AiOutlineFundView } from "react-icons/ai";
import React, { useContext, useState } from "react";
import {
  StyledModal,
  StyledSalesText,
  StyledTableBodyText,
  StyledTableHeadersText,
} from "../../style/Style";
import { BiDownload } from "react-icons/bi";
import ShopContext from "../../context/ShopContext";
import axios from "axios";

const UserSalesRecord = () => {
  const [openModal, setOpenModal] = useState(false);
  const [billRecords, setBillRecords] = useState([]);
  const { loading, setLoading, url } = useContext(ShopContext);

  const billRecordshandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(url + "/getBillRecords");
      setOpenModal(true);
      setBillRecords(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Tooltip
        title="sales records"
        sx={{
          position: "fixed",
          bottom: 70,
          right: 30,
        }}
      >
        <Fab color="primary" onClick={billRecordshandler}>
          <AiOutlineFundView size="1.5rem" />
        </Fab>
      </Tooltip>
      <Modal
        sx={{ backdropFilter: "blur(6px)" }}
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <StyledModal>
          <StyledSalesText mb={2}>Bill Record</StyledSalesText>
          <TableContainer
            component={Paper}
            elevation={5}
            sx={{ maxHeight: "300px" }}
            my={5}
          >
            <Table aria-label="simple table">
              <TableHead sx={{ backgroundColor: "#6741d9" }}>
                <TableRow>
                  <TableCell>
                    <StyledTableHeadersText>col</StyledTableHeadersText>
                  </TableCell>
                  <TableCell>
                    <StyledTableHeadersText>Customer</StyledTableHeadersText>
                  </TableCell>
                  <TableCell>
                    <StyledTableHeadersText>Brand</StyledTableHeadersText>
                  </TableCell>
                  <TableCell>
                    <StyledTableHeadersText>Items</StyledTableHeadersText>
                  </TableCell>
                  <TableCell>
                    <StyledTableHeadersText>Quantity</StyledTableHeadersText>
                  </TableCell>
                  <TableCell>
                    <StyledTableHeadersText>Total ₹</StyledTableHeadersText>
                  </TableCell>
                  <TableCell>
                    <StyledTableHeadersText>
                      Download
                    </StyledTableHeadersText>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? <StyledSalesText sx={{textAlign:"center"}}>Please wait...</StyledSalesText> :
                billRecords.map((bill, index) => (
                  <TableRow>
                    <TableCell key={bill._id}>
                      <StyledTableBodyText>{index + 1}</StyledTableBodyText>
                    </TableCell>
                    <TableCell>
                      <StyledTableBodyText>{bill.name}</StyledTableBodyText>
                    </TableCell>
                    <TableCell>
                      <StyledTableBodyText>Turtle</StyledTableBodyText>
                    </TableCell>
                    <TableCell>
                      <StyledTableBodyText>{bill.items.join(" ,")}</StyledTableBodyText>
                    </TableCell>
                    <TableCell>
                      <StyledTableBodyText>{bill.quantity.length}</StyledTableBodyText>
                    </TableCell>
                    <TableCell>
                      <StyledTableBodyText>Rs.{bill.totalAmount}</StyledTableBodyText>
                    </TableCell>
                    <TableCell>
                      <IconButton>
                        <BiDownload
                          style={{ fontSize: "1.2rem", color: "#6741d9" }}
                        />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              }
              </TableBody>
            </Table>
          </TableContainer>
        </StyledModal>
      </Modal>
    </div>
  );
};

export default UserSalesRecord;
