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
import React, { useState } from "react";
import {
  StyledModal,
  StyledSalesText,
  StyledTableBodyText,
  StyledTableHeadersText,
} from "../../style/Style";
import { BiDownload } from "react-icons/bi";

const UserSalesRecord = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div>
      <Tooltip
        title="sales records"
        onClick={() => setOpenModal(true)}
        sx={{
          position: "fixed",
          bottom: 70,
          right: 30,
        }}
      >
        <Fab color="primary">
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
                    <StyledTableHeadersText>Item No.</StyledTableHeadersText>
                  </TableCell>
                  <TableCell>
                    <StyledTableHeadersText>Item Name</StyledTableHeadersText>
                  </TableCell>
                  <TableCell>
                    <StyledTableHeadersText>Brand</StyledTableHeadersText>
                  </TableCell>
                  <TableCell>
                    <StyledTableHeadersText>Size</StyledTableHeadersText>
                  </TableCell>
                  <TableCell>
                    <StyledTableHeadersText>Quantity</StyledTableHeadersText>
                  </TableCell>
                  <TableCell>
                    <StyledTableHeadersText>Amount ₹</StyledTableHeadersText>
                  </TableCell>
                  <TableCell>
                    <StyledTableHeadersText>
                      Add / Remove
                    </StyledTableHeadersText>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <StyledTableBodyText>0</StyledTableBodyText>
                  </TableCell>
                  <TableCell>
                    <StyledTableBodyText>T-shirt</StyledTableBodyText>
                  </TableCell>
                  <TableCell>
                    <StyledTableBodyText>Turtle</StyledTableBodyText>
                  </TableCell>
                  <TableCell>
                    <StyledTableBodyText>M</StyledTableBodyText>
                  </TableCell>
                  <TableCell>
                    <StyledTableBodyText>1</StyledTableBodyText>
                  </TableCell>
                  <TableCell>
                    <StyledTableBodyText>Rs. 999</StyledTableBodyText>
                  </TableCell>
                  <TableCell>
                    <IconButton>
                      <BiDownload style={{ fontSize: "1.2rem", color: "#6741d9" }}/>
                    </IconButton>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </StyledModal>
      </Modal>
    </div>
  );
};

export default UserSalesRecord;
