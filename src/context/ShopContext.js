import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ShopContext = createContext("");

export const ShopContextProvider = ({ children }) => {
  const url = process.env.REACT_APP_BACKEND_URL;
  const [stock, setStock] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("userLoggedIn"));
  const [loginUser, setLoginUser] = useState(localStorage.getItem("username"));
  const [billDetails, setBillDetails] = useState({
    name: "",
    email: "",
    phone: "",
    items: [],
    quantity: [],
    totalAmount: 0,
    size: [],
    date: new Date().toDateString(),
  });

  const errorToast = (msg) => {
    toast.error(msg, {
      transition: Flip,
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const successToast = (msg) =>
    toast.success(msg, {
      transition: Flip,
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  useEffect(() => {
    axios.get(url + "/sales").then(({ data }) => setStock(data));
  }, [url]);

  return (
    <ShopContext.Provider
      value={{
        loading,
        setLoading,
        loginUser,
        setLoginUser,
        isLoggedIn,
        setIsLoggedIn,
        billDetails,
        setBillDetails,
        stock,
        successToast,
        errorToast,
        url,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContext;
