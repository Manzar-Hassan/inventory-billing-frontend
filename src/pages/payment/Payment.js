import React, { useContext, useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import ShopContext from "../../context/ShopContext";
import { StyledButton } from "../../style/Style";

let stripePromise;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
  }
  return stripePromise;
};

const Payment = ({ billHandler }) => {
  const [items, setItems] = useState([]);
  const { billDetails, setBillDetails,url } = useContext(ShopContext);

  const getItemId = (itemName) => {
    if (itemName === "T-shirt") return process.env.REACT_APP_TSHIRT_ID;
    if (itemName === "shirt") return process.env.REACT_APP_SHIRT_ID;
    if (itemName === "Jeans") return process.env.REACT_APP_JEANS_ID;
    if (itemName === "Jacket") return process.env.REACT_APP_JACKET_ID;
  };

  useEffect(() => {
    if (billDetails.items.length) {
      setItems(
        billDetails.items.map((item, index) => ({
          price: getItemId(item),
          quantity: Number(billDetails.quantity[index]),
        }))
      );
    }
  }, [billDetails.items, billDetails.quantity]);

  const checkoutOptions = {
    lineItems: items,
    mode: "payment",
    successUrl: `https://bill-success-page.netlify.app/`,
    cancelUrl: `https://bill-error-page.netlify.app/`,
  };

  const redirectToCheckout = async () => {
    await billHandler();

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout(checkoutOptions);
    if (error) {
      alert(error.message);
      return;
    }

    setBillDetails({
      ...billDetails,
      items: [],
      quantity: [],
      totalAmount: 0,
      size: [],
    });
  };

  return (
    <StyledButton variant="contained" onClick={redirectToCheckout}>
      Checkout
    </StyledButton>
  );
};

export default Payment;
