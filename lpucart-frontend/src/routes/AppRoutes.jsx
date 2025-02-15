import { Routes, Route } from "react-router-dom";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Products from "../pages/Products";
import Cart from "../pages/Cart";
import ProductDetails from "../pages/ProductDetails";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
};

export default AppRoutes;
