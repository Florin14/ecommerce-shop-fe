import React, { useEffect, useState } from "react";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import {
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Tabs,
  Tab,
  Box,
  Rating,
  IconButton,
  Breadcrumbs,
  Link,
} from "@mui/material";
import {
  Favorite,
  Share,
  ShoppingCart,
  Add,
  Remove,
} from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../../store/hooks";
import { getProductDetails } from "../../../store/slices/products/thunks";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import V0Navbar from "../../generic-components/V0Navbar/V0Navbar";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Container = styled("div")(({ theme }) => ({
  minHeight: "100vh",
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  padding: theme.spacing(4),
}));

const ProductImage = styled("img")({
  width: "100%",
  height: "auto",
  objectFit: "cover",
  borderRadius: 8,
});

const ColorButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "selected",
})<{ selected?: boolean }>(({ theme, selected }) => ({
  minWidth: 0,
  width: 40,
  height: 40,
  borderRadius: "50%",
  margin: theme.spacing(0, 1, 1, 0),
  border: selected ? `2px solid ${theme.palette.primary.main}` : "none",
}));

const SizeButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "selected",
})<{ selected?: boolean }>(({ theme, selected }) => ({
  minWidth: 0,
  width: 48,
  height: 48,
  margin: theme.spacing(0, 1, 1, 0),
  // backgroundColor: selected ? theme.palette.primary.main : "transparent",
  // color: selected
  //   ? theme.palette.primary.contrastText
  //   : theme.palette.text.primary,
  // "&:hover": {
  //   backgroundColor: selected
  //     ? theme.palette.primary.dark
  //     : theme.palette.action.hover,
  // },
}));

interface ProductDetailState {
  quantity: number;
  selectedColor: string;
  selectedSize: string;
  tabValue: number;
}

const ProductDetail: React.FC = () => {
  const { productId } = useParams();

  const dispatch = useAppDispatch();
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(0);
  const [tabValue, setTabValue] = useState<number>(0);

  const productDetails = useSelector(
    (state: RootState) => state.products.product
  );
  console.log(productDetails);

  useEffect(() => {
    if (productId) dispatch(getProductDetails({ id: parseInt(productId) }));
  }, [productId]);

  // state: ProductDetailState = {
  //   quantity: 1,
  //   selectedColor: 'black',
  //   selectedSize: 'm',
  //   tabValue: 0,
  // }

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
  };

  const handleQuantityChange = (change: number) => {
    setQuantity((prevState: number) =>
      Math.max(1, Math.min(10, prevState + change))
    );
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleAddToFavourites = () => {
    
  }

  const colors = ["black", "white", "gray", "navy"];
  const sizes = ["XS", "S", "M", "L", "XL"];

  return (
    <ThemeProvider theme={darkTheme}>
      <Container>
        <V0Navbar/>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 4 }}>
          <Link color="inherit" href="#">
            Category
          </Link>
          <Link color="inherit" href="#">
            Clothing
          </Link>
          <Typography color="text.primary">{productDetails?.name || ""}</Typography>
        </Breadcrumbs>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <ProductImage src="/placeholder.svg" alt="Product Image" />
            <Grid container spacing={2} sx={{ mt: 2 }}>
              {[...Array(4)].map((_, index) => (
                <Grid item xs={3} key={index}>
                  <ProductImage
                    src="/placeholder.svg"
                    alt={`Thumbnail ${index + 1}`}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="h4" component="h1" gutterBottom>
              {productDetails?.name || ""}
              </Typography>
              <Box>
                <IconButton aria-label="add to favorites" onClick={handleAddToFavourites}>
                  <Favorite />
                </IconButton>
                <IconButton aria-label="share">
                  <Share />
                </IconButton>
              </Box>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Rating value={4} readOnly />
              <Typography variant="body2" sx={{ ml: 1 }}>
                (102.2k Reviews)
              </Typography>
            </Box>

            <Typography variant="h5" component="p" gutterBottom>
              $120.00
            </Typography>
            <Typography
              variant="body2"
              sx={{ textDecoration: "line-through", mb: 4 }}
            >
              $150.00
            </Typography>

            <Typography variant="subtitle1" gutterBottom>
              Color
            </Typography>
            <Box sx={{ mb: 4 }}>
              {colors.map((color) => (
                <ColorButton
                  key={color}
                  onClick={() => handleColorChange(color)}
                  selected={selectedColor === color}
                  style={{ backgroundColor: color }}
                />
              ))}
            </Box>

            <Typography variant="subtitle1" gutterBottom>
              Size
            </Typography>
            <Box sx={{ mb: 4 }}>
              {sizes.map((size) => (
                <SizeButton
                  key={size}
                  onClick={() => handleSizeChange(size)}
                  selected={selectedSize === size}
                  variant={selectedSize === size ? "contained" : "outlined"}
                >
                  {size.toUpperCase()}
                </SizeButton>
              ))}
            </Box>

            <Typography variant="subtitle1" gutterBottom>
              Quantity
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
              <Button
                variant="outlined"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                <Remove />
              </Button>
              <Typography sx={{ mx: 2 }}>{quantity}</Typography>
              <Button
                variant="outlined"
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= 10}
              >
                <Add />
              </Button>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<ShoppingCart />}
                >
                  Add to Cart
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button variant="outlined" fullWidth>
                  Buy Now
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Box sx={{ width: "100%", mt: 8 }}>
          <Tabs value={tabValue} onChange={handleTabChange} centered>
            <Tab label="Description" />
            <Tab label="Specifications" />
            <Tab label="Reviews" />
          </Tabs>
          <Box sx={{ p: 3 }}>
            {tabValue === 0 && (
              <Typography>
                Premium cotton t-shirt crafted for comfort and style. Made with
                100% organic cotton, this t-shirt features a classic fit,
                reinforced seams, and a durable construction that will last
                through countless washes. Perfect for everyday wear or casual
                occasions.
              </Typography>
            )}
            {tabValue === 1 && (
              <Card>
                <CardContent>
                  <Typography variant="body1" gutterBottom>
                    <strong>Material:</strong> 100% Organic Cotton
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Weight:</strong> 180 GSM
                  </Typography>
                  <Typography variant="body1">
                    <strong>Care Instructions:</strong> Machine wash cold
                  </Typography>
                </CardContent>
              </Card>
            )}
            {tabValue === 2 && (
              <Card>
                <CardContent>
                  {[...Array(3)].map((_, index) => (
                    <Box
                      key={index}
                      sx={{
                        mb: 4,
                        pb: 2,
                        borderBottom: index < 2 ? 1 : 0,
                        borderColor: "divider",
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 1 }}
                      >
                        <Rating value={4} readOnly size="small" />
                        <Typography variant="body2" sx={{ ml: 1 }}>
                          2 weeks ago
                        </Typography>
                      </Box>
                      <Typography variant="body2">
                        Great quality t-shirt! The fabric is soft and
                        comfortable, and the fit is perfect. Would definitely
                        recommend.
                      </Typography>
                    </Box>
                  ))}
                </CardContent>
              </Card>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default ProductDetail;
