import React, { useState } from "react";
import { checkoutCart } from "../api/cartApi";
import { Container, Typography, TextField, Button, Box } from "@mui/material";

const Checkout = () => {
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleCheckout = async () => {
    if (!address || !paymentMethod) {
      alert("Please fill in all fields.");
      return;
    }
    try {
      await checkoutCart();
      alert("Checkout successful!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Checkout
      </Typography>
      <Box sx={{ maxWidth: 400, mx: "auto" }}>
        <TextField
          label="Shipping Address"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <TextField
          label="Payment Method (e.g., Credit Card, PayPal)"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        />
        <Button variant="contained" color="primary" fullWidth onClick={handleCheckout}>
          Confirm Purchase
        </Button>
      </Box>
    </Container>
  );
};

export default Checkout;
