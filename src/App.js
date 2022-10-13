import Bill from "./pages/bill/Bill";
import Login from "./pages/login/Login";
import Sales from "./pages/sales/Sales";
import Register from "./pages/register/Register";
import SharedComponent from "./helper/SharedComponent";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./helper/ProtectedRoutes";
import { ShopContextProvider } from "./context/ShopContext";
import { ToastContainer } from "react-toastify";
import Invoice from "./components/invoice/Invoice";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <ShopContextProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<SharedComponent />}>
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Bill />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/sales"
                element={
                  <ProtectedRoute>
                    <Sales />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route
              path="/invoice"
              element={
                <ProtectedRoute>
                  <Invoice />
                </ProtectedRoute>
              }
            />
          </Routes>
        </ShopContextProvider>
      </BrowserRouter>
      <ToastContainer theme="dark" />
    </>
  );
};

export default App;
