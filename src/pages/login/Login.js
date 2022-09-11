import React, { useContext } from "react";
import {
  Container,
  Button,
  Grid,
  Paper,
  TextField,
  Avatar,
  Box,
  Typography,
  Backdrop,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { MdLogin } from "react-icons/md";
import { signinSchema } from "../../schema/LoginSchema";
import { Link, useNavigate } from "react-router-dom";
import ShopContext from "../../context/ShopContext";
import Loader from "../../components/loader/Loader";

const Login = () => {
  const { loading, setLoading, setIsLoggedIn, setLoginUser } =
    useContext(ShopContext);
  const navigate = useNavigate();

  const onSubmit = async (values, action) => {
    const url = "https://inventory-billing-05.herokuapp.com/login";
    const data = {};
    data.username = signin.values.name;
    data.password = signin.values.password;

    try {
      setLoading(true);
      const loginCredentialsData = await axios.post(url, data);
      setLoading(false);
      console.log(loginCredentialsData);

      if (loginCredentialsData.status === 200) {
        alert(loginCredentialsData.data.msg);
        setIsLoggedIn(true);
        setLoginUser(data.username);
        navigate("/");
      } else {
        alert("wrong credentials!!");
        action.resetForm();
        return;
      }
    } catch (error) {
      console.log(error);
    }
    action.resetForm();
  };

  const signin = useFormik({
    initialValues: {
      name: "",
      password: "",
    },
    validationSchema: signinSchema,
    onSubmit,
  });

  return (
    <>
      <Box sx={{ minHeight: "100vh" }}>
        <Container maxWidth="sm">
          <Grid
            container
            spacing={2}
            direction="column"
            justifyContent="center"
            style={{ minHeight: "100vh" }}
          >
            <Paper elelvation={2} sx={{ padding: 5 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar
                  sx={{
                    height: "50px",
                    width: "50px",
                    bgcolor: "#ff0080",
                  }}
                >
                  <MdLogin />
                </Avatar>
                <Typography
                  variant="h6"
                  sx={{ marginBottom: "1rem", fontWeight: "bold" }}
                >
                  Login
                </Typography>
              </Box>
              <form
                autoComplete="off"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
                onSubmit={signin.handleSubmit}
              >
                <TextField
                  type="text"
                  id="name"
                  size="small"
                  label="Username"
                  variant="outlined"
                  value={signin.values.name}
                  onChange={signin.handleChange}
                  onBlur={signin.handleBlur}
                  error={
                    signin.errors.name && signin.touched.name ? true : false
                  }
                  helperText={signin.touched.name && signin.errors.name}
                  required
                />
                <TextField
                  type="password"
                  id="password"
                  size="small"
                  label="Password"
                  variant="outlined"
                  value={signin.values.password}
                  onChange={signin.handleChange}
                  onBlur={signin.handleBlur}
                  error={
                    signin.errors.password && signin.touched.password
                      ? true
                      : false
                  }
                  helperText={signin.touched.password && signin.errors.password}
                  required
                />
                  <Button variant="contained" type="submit">
                    confirm
                  </Button>
              </form>
              <Grid item mt={1}>
                <Typography sx={{ fontSize: "0.7rem" }}>
                  No Account ? click here to{" "}
                  <Link to="/register">Register</Link>
                </Typography>
              </Grid>
            </Paper>
          </Grid>
        </Container>
      </Box>
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

export default Login;
