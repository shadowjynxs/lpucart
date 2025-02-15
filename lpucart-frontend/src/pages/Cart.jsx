import React, { useState, useEffect, useCallback } from "react";
import { getCart, removeFromCart, updateCartQuantity, checkoutCart } from "../api/cartApi";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  CardMedia,
  IconButton,
  TextField,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Cart = () => {
  const [cart, setCart] = useState([]);

  const fetchCart = useCallback(async () => {
    try {
      const response = await getCart();
      setCart(response.cartItems || []);
    } catch (error) {
      console.error("Failed to fetch cart", error);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleRemove = async (productId) => {
    try {
      await removeFromCart(productId);
      setCart((prevCart) => prevCart.filter((item) => item.product._id !== productId));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const handleQuantityChange = async (productId, quantity) => {
    if (quantity < 0) return;
    try {
      await updateCartQuantity(productId, quantity);
      if(quantity == 0){
        fetchCart()
      }
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.product._id === productId ? { ...item, quantity } : item
        )
      );
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleCheckout = async () => {
    try {
      await checkoutCart();
      alert("Checkout successful!");
      setCart([]); 
    } catch (error) {
      console.error("Checkout failed:", error);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Your Cart
      </Typography>

      {cart.length === 0 ? (
        <Typography variant="h6" align="center">
          Your cart is empty.
        </Typography>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {cart.map((item) => (
            <Card key={item._id} sx={{ display: "flex", alignItems: "center", padding: 2 }}>
              <CardMedia
                component="img"
                height="100"
                image={item.product.image || "https://via.placeholder.com/100"}
                alt={item.product.name}
                sx={{ width: 100, borderRadius: 2 }}
              />
              <CardContent sx={{ flexGrow: 1, ml: 2 }}>
                <Typography variant="h6">{item.product.name}</Typography>
                <Typography variant="body2">Category: {item.product.category}</Typography>
                <Typography variant="body2">Price: ${item.product.cost}</Typography>
                <Typography variant="body2">Rating: {item.product.rating} ⭐</Typography>

                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  <TextField
                    type="number"
                    size="small"
                    value={item.quantity || 0}
                    onChange={(e) => handleQuantityChange(item.product._id, parseInt(e.target.value))}
                    sx={{ width: 60, mr: 1 }}
                  />
                  <IconButton color="error" onClick={() => handleRemove(item.product._id)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {cart.length > 0 && (
        <Button variant="contained" color="primary" sx={{ mt: 3 }} fullWidth onClick={handleCheckout}>
          Checkout
        </Button>
      )}
    </Container>
  );
};

export default Cart;
