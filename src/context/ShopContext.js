import axios from "axios";
import { createContext, useState, useEffect } from "react";

const ShopContext = createContext("");

export const ShopContextProvider = ({ children }) => {
  const url = "https://inventory-billing-05.herokuapp.com";
  const [stock, setStock] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginUser, setLoginUser] = useState("");
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
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContext;
