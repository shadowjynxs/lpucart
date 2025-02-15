import React, { useState, useEffect } from "react";
import { getCart, removeFromCart, updateCartQuantity, checkoutCart } from "../api/cartApi";
import { Container, Typography, Card, CardContent, Button, Grid, CardMedia, IconButton, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await getCart();
        setCart(response.items);
      } catch (error) {
        console.error("Failed to fetch cart", error);
      }
    };

    fetchCart();
  }, []);

  const handleRemove = async (productId) => {
    try {
      await removeFromCart(productId);
      setCart(cart.filter((item) => item.product._id !== productId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleQuantityChange = async (productId, quantity) => {
    if (quantity < 1) return;
    try {
      await updateCartQuantity(productId, quantity);
      setCart(
        cart.map((item) =>
          item.product._id === productId ? { ...item, quantity } : item
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckout = async () => {
    try {
      await checkoutCart();
      alert("Checkout successful!");
      setCart([]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Your Cart
      </Typography>
      <Grid container spacing={3}>
        {cart.length === 0 ? (
          <Typography variant="h6" align="center">
            Your cart is empty.
          </Typography>
        ) : (
          cart.map((item) => (
            <Grid key={item.product._id} xs={12} sm={6} md={4}>
              <Card sx={{ display: "flex", alignItems: "center", padding: 2 }}>
                <CardMedia
                  component="img"
                  height="100"
                  image={item.product.image || "https://via.placeholder.com/100"}
                  alt={item.product.name}
                  sx={{ width: 100 }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6">{item.product.name}</Typography>
                  <Typography variant="body2">Price: ${item.product.price}</Typography>
                  <TextField
                    type="number"
                    size="small"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.product._id, parseInt(e.target.value))}
                    sx={{ width: 60, mr: 1 }}
                  />
                  <IconButton color="error" onClick={() => handleRemove(item.product._id)}>
                    <DeleteIcon />
                  </IconButton>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
      {cart.length > 0 && (
        <Button variant="contained" color="primary" sx={{ mt: 3 }} fullWidth onClick={handleCheckout}>
          Checkout
        </Button>
      )}
    </Container>
  );
};

export default Cart;
