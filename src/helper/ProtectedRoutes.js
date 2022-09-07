import { useContext } from "react";
import { Navigate } from "react-router-dom";
import ShopContext from "../context/ShopContext";

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useContext(ShopContext);

  if (!isLoggedIn) {
    return <Navigate to={"/login"} replace />;
  }

  return children;
}

export default ProtectedRoute;