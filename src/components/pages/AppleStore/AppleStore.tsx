import React, { useEffect, useState } from "react";
import { Heart, Check } from "lucide-react";
import { styled } from "@mui/material";
import V0Sidebar from "../../generic-components/V0Sidebar/V0Sidebar";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { RootState } from "../../../store";
import { getProducts } from "../../../store/slices/products/thunks";
import V0Navbar from "../../generic-components/V0Navbar/V0Navbar";
import V0Breadcrumb from "../../generic-components/VOBreadcrumb/V0Breadcrumb";
import V0StoreProfile from "../../generic-components/V0StoreProfile/V0StoreProfile";

const Container = styled("div")`
  background-color: #1a1a1a;
  color: #ffffff;
  font-family:
    "SF Pro Display",
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    "Open Sans",
    "Helvetica Neue",
    sans-serif;
  display: flex;
  min-height: 100vh;
`;

const MainContent = styled("main")`
  flex: 1;
`;

const InfoHeader = styled("div")`
  background-color: #2a2a2a;
  padding: 0.5rem 2rem;
  font-size: 0.9rem;
  color: #999;
`;

const Button = styled("button")`
  background-color: #3a3a3a;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #4a4a4a;
  }
`;

const ProductGrid = styled("div")`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  padding: 2rem;
`;

const ProductCard = styled("div")`
  background-color: #2a2a2a;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
`;

const ProductImage = styled("img")`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const WishlistButton = styled("button")`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
`;

const ProductInfo = styled("div")`
  padding: 1rem;
`;

const ProductName = styled("h3")`
  margin: 0;
  font-size: 1rem;
`;

const ProductPrice = styled("p")`
  margin: 0.5rem 0;
  font-weight: bold;
`;

const ProductActions = styled("div")`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const AppleStore = () => {
  const sortBy = useAppSelector((state: RootState) => state.products.sortBy);

  const sortType = useAppSelector(
    (state: RootState) => state.products.sortType
  );

  const dispatch = useAppDispatch();
  const products = useAppSelector(
    (state: RootState) => state.products.products
  );

  useEffect(() => {
    dispatch(getProducts({ sortBy, sortType }));
  }, []);

  return (
    <Container>
      <V0Sidebar />
      <MainContent>
        <V0Navbar />
        <InfoHeader>
          <V0Breadcrumb />
        </InfoHeader>
        <V0StoreProfile />
        <ProductGrid>
          {productsData.map((product, index) => (
            <ProductCard key={index}>
              <ProductImage src={product.image} alt={product.name} />
              <WishlistButton>
                <Heart size={18} />
              </WishlistButton>
              <ProductInfo>
                <ProductName>{product.name}</ProductName>
                <ProductPrice>
                  ${product.price.toFixed(2)}{" "}
                  <span
                    style={{
                      textDecoration: "line-through",
                      color: "#999",
                      marginLeft: "0.5rem",
                    }}
                  >
                    ${product.originalPrice.toFixed(2)}
                  </span>
                </ProductPrice>
                <ProductActions>
                  <Button>Add to Cart</Button>
                  <Button>Buy Now</Button>
                </ProductActions>
              </ProductInfo>
            </ProductCard>
          ))}
        </ProductGrid>
      </MainContent>
    </Container>
  );
};

export default AppleStore;

const productsData = [
  {
    name: "Macbook Pro M1 (2021)",
    price: 2245.9,
    originalPrice: 2339.9,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/macbook-pro-m1-erwaMjtGob2wQIxqtYy8facEflTXIv.jpg",
  },
  {
    name: "Macbook Pro M2 (2022)",
    price: 1299.0,
    originalPrice: 1499.0,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/macbook-pro-m2-erwaMjtGob2wQIxqtYy8facEflTXIv.jpg",
  },
  {
    name: "iPhone 14 Pro",
    price: 995.0,
    originalPrice: 1099.0,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/iphone-14-pro-erwaMjtGob2wQIxqtYy8facEflTXIv.jpg",
  },
  {
    name: "iPhone 14 Plus",
    price: 899.0,
    originalPrice: 999.0,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/iphone-14-plus-erwaMjtGob2wQIxqtYy8facEflTXIv.jpg",
  },
  {
    name: "Airpods Pro 2",
    price: 197.5,
    originalPrice: 249.0,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/airpods-pro-2-erwaMjtGob2wQIxqtYy8facEflTXIv.jpg",
  },
  {
    name: "iPad Pro 2 (2021)",
    price: 753.0,
    originalPrice: 799.0,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ipad-pro-2-erwaMjtGob2wQIxqtYy8facEflTXIv.jpg",
  },
  {
    name: "iPhone SE Gen 2 (2022)",
    price: 375.0,
    originalPrice: 429.0,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/iphone-se-gen-2-erwaMjtGob2wQIxqtYy8facEflTXIv.jpg",
  },
  {
    name: "Apple Watch Series 8",
    price: 300.0,
    originalPrice: 399.0,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/apple-watch-series-8-erwaMjtGob2wQIxqtYy8facEflT.jpg",
  },
];
