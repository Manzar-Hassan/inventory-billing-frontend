import React, { useContext, useState } from "react";
import {
  Backdrop,
  Badge,
  Box,
  Divider,
  IconButton,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import ShopContext from "../../context/ShopContext";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsCheck2 } from "react-icons/bs";
import { BiPlus } from "react-icons/bi";
import {
  StyledButton,
  StyledCustomerCard,
  StyledHeader,
  StyledSalesCardContainer,
  StyledSalesText,
  StyledTableBodyText,
  StyledTableHeadersText,
  StyledUserInfo,
} from "../../style/Style";
import Loader from "../../components/loader/Loader";
import axios from "axios";

const Bill = () => {
  const [id, setId] = useState(0);
  const [size, setSize] = useState("");
  const [item, setItem] = useState("");
  const [count, setCount] = useState(0);
  const [quantity, setQuantity] = useState("");
  const [customerItem, setCustomerItem] = useState([""]);
  const [amount, setAmount] = useState([]);
  const [addCustomerInfo, setAddCustomerInfo] = useState(false);
  const { loading, setLoading, billDetails, setBillDetails, stock } =
    useContext(ShopContext);
  const url = "https://inventory-billing-05.herokuapp.com";

  const handleBill = (e) => {
    setBillDetails({ ...billDetails, [e.target.name]: e.target.value });
  };

  const resetHandler = () => {
    setBillDetails({ ...billDetails, name: "", email: "", phone: "" });
    setAddCustomerInfo(false);
  };

  const handleCustomerItems = () => {
    if (item === "") {
      alert("please select item!!");
      return;
    } else if (quantity === "") {
      alert("please enter quantity!!");
      return;
    } else if (size === "") {
      alert("please select size!!");
      return;
    }

    setId((prevId) => prevId + 1);
    setCustomerItem([...customerItem, ""]);
    setItem("");
    setQuantity("");
    setSize("");
  };

  const handleChange = (e) => {
    const name = e.target.name;

    if (name === "items") {
      setItem(e.target.value);
      setBillDetails({
        ...billDetails,
        items: [...billDetails.items, e.target.value],
      });
    } else if (name === "quantity") {
      const filteredStock = stock.filter(
        (stock) =>
          stock.item === billDetails.items[billDetails.items.length - 1]
      );
      const price = filteredStock[0].sellingPrice * Number(e.target.value);
      setAmount([...amount, price]);
      setQuantity(e.target.value);
      setCount(Number(e.target.value) + count);
      setBillDetails({
        ...billDetails,
        quantity: [...billDetails.quantity, e.target.value],
        totalAmount: billDetails.totalAmount + price,
      });
    } else if (name === "size") {
      setSize(e.target.value);
      setBillDetails({
        ...billDetails,
        size: [...billDetails.size, e.target.value],
      });
    }
  };

  const updateStockHandler = async () => {
    for (let i = 0; i < billDetails.items.length; i++) {
      const filteredStock = stock.filter(
        (stock) => stock.item === billDetails.items[i]
      );
      const updatedStock = {
        stock: Number(filteredStock[0].stock) - Number(billDetails.quantity[i]),
      };

      await axios.post(
        url + `/updateStocks/${billDetails.items[i]}`,
        updatedStock
      );
    }
  };

  const billHandler = async () => {
    if (
      billDetails.name === "" ||
      billDetails.email === "" ||
      billDetails.phone === ""
    ) {
      alert("please fill user details!!");
      return;
    }

    setLoading(true);

    await axios
      .post(url + "/bill", billDetails)
      .then(({ data }) => console.log(data.msg));
    await updateStockHandler();

    setBillDetails({
      ...billDetails,
      items: [],
      quantity: [],
      totalAmount: 0,
      size: [],
    });

    setId(0);
    setSize("");
    setItem("");
    setCount(0);
    setQuantity("");
    setCustomerItem([""]);
    setAmount([]);

    setLoading(false);
  };

  return (
    <>
      {console.log(stock, billDetails)}
      <Divider sx={{ marginTop: "3rem" }}>
        <StyledHeader label="Billing Section" />
      </Divider>
      <StyledSalesCardContainer mt={3}>
        <StyledSalesText>Customer Info :</StyledSalesText>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ gap: "1rem", flexWrap: "wrap" }}
        >
          <StyledCustomerCard>
            <StyledUserInfo component="div">
              {addCustomerInfo ? (
                <TextField
                  label="name"
                  name="name"
                  variant="standard"
                  onChange={handleBill}
                  value={billDetails.name}
                />
              ) : billDetails.name === "" ? (
                "Customer name"
              ) : (
                billDetails.name
              )}
            </StyledUserInfo>
          </StyledCustomerCard>
          <StyledCustomerCard>
            <StyledUserInfo component="div">
              {addCustomerInfo ? (
                <TextField
                  label="email"
                  name="email"
                  variant="standard"
                  onChange={handleBill}
                  value={billDetails.email}
                />
              ) : billDetails.email === "" ? (
                "Customer email"
              ) : (
                billDetails.email
              )}
            </StyledUserInfo>
          </StyledCustomerCard>
          <StyledCustomerCard>
            <StyledUserInfo component="div">
              {addCustomerInfo ? (
                <TextField
                  label="phone"
                  name="phone"
                  variant="standard"
                  onChange={handleBill}
                  value={billDetails.phone}
                />
              ) : billDetails.phone === "" ? (
                "Customer phone"
              ) : (
                billDetails.phone
              )}
            </StyledUserInfo>
          </StyledCustomerCard>
          <Box>
            <Badge badgeContent={count} color="secondary">
              <AiOutlineShoppingCart
                style={{ fontSize: "2rem", color: "#6741d9" }}
              />
            </Badge>
          </Box>
        </Stack>
        <Box mt={2} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <StyledButton
            variant="contained"
            onClick={() => setAddCustomerInfo(true)}
          >
            Add Details
          </StyledButton>
          <StyledButton
            variant="contained"
            onClick={() => setAddCustomerInfo(false)}
          >
            Confirm
          </StyledButton>
          <StyledButton variant="contained" onClick={resetHandler}>
            Reset
          </StyledButton>
        </Box>
      </StyledSalesCardContainer>
      <StyledSalesCardContainer mt={3}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <StyledSalesText>Purchase Summary :</StyledSalesText>
          <StyledButton
            variant="contained"
            startIcon={<BiPlus />}
            onClick={handleCustomerItems}
          >
            Add Items
          </StyledButton>
        </Stack>
        <TableContainer
          component={Paper}
          elevation={5}
          sx={{ maxHeight: "300px", borderRadius: "15px" }}
          my={5}
        >
          <Table aria-label="simple table">
            <TableHead sx={{ backgroundColor: "#000" }}>
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
                  <StyledTableHeadersText>Confirm Item</StyledTableHeadersText>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customerItem.map((itemCus, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <StyledTableBodyText>{index + 1}</StyledTableBodyText>
                  </TableCell>
                  <TableCell>
                    <StyledTableBodyText component="div">
                      {true && id === index ? (
                        <Box width="100px">
                          <TextField
                            name="items"
                            size="small"
                            label="Item"
                            select
                            value={item}
                            onChange={handleChange}
                            fullWidth
                          >
                            <MenuItem value="shirt">shirt</MenuItem>
                            <MenuItem value="T-shirt">T-shirt</MenuItem>
                            <MenuItem value="Jeans">Jeans</MenuItem>
                            <MenuItem value="Jacket">Jacket</MenuItem>
                          </TextField>
                        </Box>
                      ) : (
                        billDetails.items[index]
                      )}
                    </StyledTableBodyText>
                  </TableCell>
                  <TableCell>
                    <StyledTableBodyText>Turtle</StyledTableBodyText>
                  </TableCell>
                  <TableCell>
                    <StyledTableBodyText component="div">
                      {true && id === index ? (
                        <Box width="100px">
                          <TextField
                            name="size"
                            size="small"
                            label="Item"
                            select
                            value={size}
                            onChange={handleChange}
                            fullWidth
                          >
                            <MenuItem value="S">S</MenuItem>
                            <MenuItem value="M">M</MenuItem>
                            <MenuItem value="L">L</MenuItem>
                            <MenuItem value="XL">XL</MenuItem>
                          </TextField>
                        </Box>
                      ) : (
                        billDetails.size[index]
                      )}
                    </StyledTableBodyText>
                  </TableCell>
                  <TableCell>
                    <StyledTableBodyText component="div">
                      {true && id === index ? (
                        <Box width="100px">
                          <TextField
                            size="small"
                            label="quantity"
                            name="quantity"
                            value={quantity}
                            onChange={handleChange}
                          />
                        </Box>
                      ) : (
                        billDetails.quantity[index]
                      )}
                    </StyledTableBodyText>
                  </TableCell>
                  <TableCell>
                    <StyledTableBodyText>
                      Rs. {amount[index]}
                    </StyledTableBodyText>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={handleCustomerItems}>
                      <BsCheck2 size="1.5rem" color="#6741d9" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

            {id > 1 && (
              <TableFooter sx={{ backgroundColor: "#000" }}>
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
                      Confirm Item
                    </StyledTableHeadersText>
                  </TableCell>
                </TableRow>
              </TableFooter>
            )}
          </Table>
        </TableContainer>
        <Box my={2}>
          <StyledButton variant="contained" onClick={billHandler}>
            Submit
          </StyledButton>
        </Box>
      </StyledSalesCardContainer>
      <div>
        <Backdrop
          sx={{
            color: "#fff",
            backdropFilter: "blur(5px)",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={loading}
        >
          <Loader />
        </Backdrop>
      </div>
    </>
  );
};

export default Bill;
