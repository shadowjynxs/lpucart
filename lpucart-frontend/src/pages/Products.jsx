import React, { useState, useEffect } from "react";
import { getProducts } from "../api/productApi";
import { addToCart } from "../api/cartApi";
import {
  Container,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Button,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data);
        console.log(response.data)
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    try {
      await addToCart(productId);
      alert("Product added to cart!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Products
      </Typography>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
              <CardMedia
                component="img"
                image={product.image || "https://via.placeholder.com/200"}
                alt={product.name}
                sx={{ height: 200, width: "100%", objectFit: "cover" }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  ${product.cost}
                </Typography>
              </CardContent>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: "auto" }}
                onClick={() => navigate(`/products/${product._id}`)}
              >
                View Details
              </Button>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={() => handleAddToCart(product._id)}
              >
                Add to Cart
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Products;
