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
import { GiArchiveRegister } from "react-icons/gi";
import ShopContext from "../../context/ShopContext";
import Loader from "../../components/loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import { registerSchema } from "../../schema/RegisterSchema";

const Register = () => {
  const {
    loading,
    setLoading,
    toastifyContainer,
    errorToast,
    successToast,
    url,
  } = useContext(ShopContext);
  const navigate = useNavigate();

  const onSubmit = async (values, action) => {
    const data = {};
    data.username = values.regName;
    data.password = values.regPassword;

    try {
      setLoading(true);
      const registerReceivedInfo = await axios.post(url + "/register", data);

      if (registerReceivedInfo.status !== 200) {
        errorToast(registerReceivedInfo.data.msg);
        
      } else if (registerReceivedInfo.status === 200) {
        successToast(registerReceivedInfo.data.msg);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
    action.resetForm();
  };

  const register = useFormik({
    initialValues: {
      regName: "",
      regPassword: "",
      confirmPassword: "",
    },
    validationSchema: registerSchema,
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
                  <GiArchiveRegister />
                </Avatar>
                <Typography
                  variant="h6"
                  sx={{ marginBottom: "1rem", fontWeight: "bold" }}
                >
                  Register
                </Typography>
              </Box>
              <form
                autoComplete="off"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
                onSubmit={register.handleSubmit}
              >
                <TextField
                  type="text"
                  id="regName"
                  size="small"
                  label="Username"
                  variant="outlined"
                  value={register.values.regName}
                  onChange={register.handleChange}
                  onBlur={register.handleBlur}
                  error={
                    register.errors.regName && register.touched.regName
                      ? true
                      : false
                  }
                  helperText={
                    register.touched.regName && register.errors.regName
                  }
                  required
                />
                <TextField
                  type="password"
                  id="regPassword"
                  size="small"
                  label="Password"
                  variant="outlined"
                  value={register.values.regPassword}
                  onChange={register.handleChange}
                  onBlur={register.handleBlur}
                  error={
                    register.errors.regPassword && register.touched.regPassword
                      ? true
                      : false
                  }
                  helperText={
                    register.touched.regPassword && register.errors.regPassword
                  }
                  required
                />
                <TextField
                  type="password"
                  id="confirmPassword"
                  size="small"
                  label="confirmPassword"
                  variant="outlined"
                  value={register.values.confirmPassword}
                  onChange={register.handleChange}
                  onBlur={register.handleBlur}
                  error={
                    register.errors.confirmPassword &&
                    register.touched.confirmPassword
                      ? true
                      : false
                  }
                  helperText={
                    register.touched.confirmPassword &&
                    register.errors.confirmPassword
                  }
                  required
                />
                <Button variant="contained" type="submit">
                  confirm
                </Button>
              </form>
              <Grid item mt={1}>
                <Typography sx={{ fontSize: "0.7rem" }}>
                  No Account ? click here to <Link to="/login">Login</Link>
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

export default Register;
