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
import { useNavigate } from "react-router-dom";
import imageNotFound from "../../../assets/ImageNotFound.png";
import Breadcrumb from "../../generic-components/Breadcrumb/Breadcrumb";
import { useSelector } from "react-redux";
import SelectProductSizeModal from "../../generic-components/SelectProductSizeModal/SelectProductSizeModal";

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
  cursor: pointer;
`;

const ProductImage = styled("img")`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const WishlistButton = styled("button")`
  position: absolute;
  top: 1rem;
  right: 0rem;
  background: black;
  border-radius: 10px 0 0 10px;
  border: none;
  color: #fff;
  cursor: pointer;
  padding: 12px 5px 8px 10px;
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

const ImagesSection = styled("div")`
  display: flex;
  justify-content: center;
  // margin: auto;
  align-items: center;
  background: black;
  width: 100%;
  height: 100%;
  border-radius: 8px 8px 0 0;
`;

const CarouselWrapper = styled("div")`
  width: 100%;
  height: 100%;
  padding: 20px 15px;
  border-radius: 10px;
  // object-fit: contain;
  background: black;
`;

const NoImageFound = styled("img")`
  object-fit: contain;
  width: 100%;
  height: 100%;
`;

interface ImageItem {
  imageData: string;
}

interface ProductItem {
  id: number;
  name: string;
  images: ImageItem[];
  price: number;
}

const AppleStore: React.FC = () => {
  const sortBy = useAppSelector((state: RootState) => state.products.sortBy);

  const sortType = useAppSelector(
    (state: RootState) => state.products.sortType
  );

  const dispatch = useAppDispatch();
  const products = useSelector((state: RootState) => state.products.products);
  const [productSizesIsOpen, setProductSizesIsOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProducts({ sortBy, sortType }));
  }, []);

  const handleProductClick = (id: number) => {
    // Navigate to the product page with the given productId
    navigate(`/admin/products/${id}`);
  };

  return (
    <Container>
      <V0Sidebar />
      <MainContent>
        <V0Navbar />
        <InfoHeader>
          {/* <V0Breadcrumb /> */}
          <Breadcrumb />
        </InfoHeader>
        <V0StoreProfile />
        <ProductGrid>
          {products.map((product: ProductItem, index) => (
            <ProductCard
              key={index}
              onClick={() => {
                handleProductClick(product.id);
              }}
            >
              {/* <ImagesSection>
                <CarouselWrapper>
                  {images?.length > 0 ? (
                    <Carousel images={images} />
                  ) : (
                    <NoImageFound src={imageNotFound} alt=" No images found" />
                  )}
                </CarouselWrapper>
              </ImagesSection> */}

              {product.images?.length > 0 ? (
                <ProductImage
                  src={
                    typeof product.images[0]?.imageData === "string"
                      ? `data:image/jpeg;base64,${product.images[0]?.imageData}`
                      : URL.createObjectURL(product.images[0]?.imageData)
                  }
                  alt={product.name}
                />
              ) : (
                <NoImageFound src={imageNotFound} alt=" No images found" />
              )}
              <WishlistButton
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
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
                    ${product.price.toFixed(2)}
                  </span>
                </ProductPrice>
                <ProductActions>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      setProductSizesIsOpen(true);
                    }}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    Buy Now
                  </Button>
                </ProductActions>
              </ProductInfo>
            </ProductCard>
          ))}
        </ProductGrid>
        <SelectProductSizeModal
          isOpen={productSizesIsOpen}
          onClose={() => {
            setProductSizesIsOpen(false);
          }}
        />
      </MainContent>
    </Container>
  );
};

export default AppleStore;
