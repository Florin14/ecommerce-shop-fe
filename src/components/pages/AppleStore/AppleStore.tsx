import React, { useEffect, useState } from "react";
// import styled from 'styled-components'
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  ChevronDown,
  Check,
  LogOut,
  FileText,
  Settings,
} from "lucide-react";
import { styled } from "@mui/material";
import V0Sidebar from "../../generic-components/V0Sidebar/V0Sidebar";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { RootState } from "../../../store";
import { getProducts } from "../../../store/slices/products/thunks";

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

const Header = styled("header")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  border-bottom: 1px solid #333;
`;

const Logo = styled("div")`
  font-size: 1.5rem;
  font-weight: bold;
`;

const SearchBar = styled("div")`
  display: flex;
  align-items: center;
  background-color: #2a2a2a;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  width: 300px;
`;

const SearchInput = styled("input")`
  background: none;
  border: none;
  color: #fff;
  width: 100%;
  margin-left: 0.5rem;

  &:focus {
    outline: none;
  }
`;

const HeaderIcons = styled("div")`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const WalletInfo = styled("span")`
  margin-right: 1rem;
`;

const UserAvatar = styled("div")`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #4a4a4a;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
`;

const UserMenu = styled("div")<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #2a2a2a;
  border-radius: 4px;
  padding: 0.5rem;
  display: ${(props) => (props.isOpen ? "block" : "none")};
`;

const UserMenuItem = styled("button")`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  color: #fff;
  padding: 0.5rem;
  width: 100%;
  cursor: pointer;

  &:hover {
    background-color: #3a3a3a;
  }

  svg {
    margin-right: 0.5rem;
  }
`;

const InfoHeader = styled("div")`
  background-color: #2a2a2a;
  padding: 0.5rem 2rem;
  font-size: 0.9rem;
  color: #999;
`;

const Breadcrumb = styled("nav")`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const BreadcrumbItem = styled("a")`
  color: #999;
  text-decoration: none;

  &:hover {
    color: #fff;
  }

  &:last-child {
    color: #fff;
    pointer-events: none;
  }
`;

const BreadcrumbSeparator = styled("span")`
  color: #666;
`;

const StoreProfile = styled("div")`
  display: flex;
  padding: 2rem;
  border-bottom: 1px solid #333;
`;

const ProfileImage = styled("div")`
  width: 64px;
  height: 64px;
  background-color: #fff;
  border-radius: 50%;
  margin-right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProfileInfo = styled("div")`
  flex: 1;
`;

const ProfileName = styled("h2")`
  margin: 0;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
`;

const VerifiedBadge = styled("span")`
  color: #1da1f2;
  margin-left: 0.5rem;
`;

const ProfileLocation = styled("p")`
  margin: 0.5rem 0;
  color: #999;
`;

const ProfileStats = styled("div")`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
`;

const Stat = styled("span")`
  color: #999;
`;

const ActionButtons = styled("div")`
  display: flex;
  gap: 0.5rem;
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
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const sortBy = useAppSelector((state: RootState) => state.products.sortBy);

  const sortType = useAppSelector(
    (state: RootState) => state.products.sortType
  );
  const handleUserMenuClick = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };
  const dispatch = useAppDispatch();
  const products = useAppSelector(
    (state: RootState) => state.products.products
  );

  const handleLogout = () => {
    // Implement logout functionality
  };

  const handleProfile = () => {
    // Navigate to profile page
  };

  const handleOrders = () => {
    // Navigate to orders page
  };

  useEffect(() => {
    dispatch(getProducts({ sortBy, sortType }));
  }, []);

  return (
    <Container>
      <V0Sidebar />
      <MainContent>
        <Header>
          <Logo>GARTEX</Logo>
          <SearchBar>
            <Search size={18} />
            <SearchInput placeholder="Search" />
          </SearchBar>
          <HeaderIcons>
            <WalletInfo>Money: $2,250,100.00</WalletInfo>
            <Heart />
            <ShoppingCart />
            <UserAvatar onClick={handleUserMenuClick}>
              <User size={18} />
              <UserMenu isOpen={isUserMenuOpen}>
                <UserMenuItem onClick={handleProfile}>
                  <Settings size={16} />
                  Profile
                </UserMenuItem>
                <UserMenuItem onClick={handleOrders}>
                  <FileText size={16} />
                  Orders
                </UserMenuItem>
                <UserMenuItem onClick={handleLogout}>
                  <LogOut size={16} />
                  Logout
                </UserMenuItem>
              </UserMenu>
            </UserAvatar>
          </HeaderIcons>
        </Header>

        <InfoHeader>
          <Breadcrumb>
            <BreadcrumbItem href="#">Category</BreadcrumbItem>
            <BreadcrumbSeparator>&gt;</BreadcrumbSeparator>
            <BreadcrumbItem href="#">Homepage</BreadcrumbItem>
            <BreadcrumbSeparator>&gt;</BreadcrumbSeparator>
            <BreadcrumbItem href="#">Gadget</BreadcrumbItem>
            <BreadcrumbSeparator>&gt;</BreadcrumbSeparator>
            <BreadcrumbItem href="#">Apple Official Store</BreadcrumbItem>
          </Breadcrumb>
        </InfoHeader>

        <StoreProfile>
          <ProfileImage>
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/apple-logo-white-8Uh4lWtGob2wQIxqtYy8facEflTXIv.png"
              alt="Apple logo"
              width="48"
              height="48"
            />
          </ProfileImage>
          <ProfileInfo>
            <ProfileName>
              Apple Official Store
              <VerifiedBadge>
                <Check size={16} />
              </VerifiedBadge>
            </ProfileName>
            <ProfileLocation>San Francisco</ProfileLocation>
            <ProfileStats>
              <Stat>Products: 100</Stat>
              <Stat>Followers: 500.13k</Stat>
              <Stat>Rating: 4.9 (10.2k Reviews)</Stat>
              <Stat>Joined: 9 years ago</Stat>
              <Stat>Chat Performance: 99%</Stat>
            </ProfileStats>
          </ProfileInfo>
          <ActionButtons>
            <Button>Follow</Button>
            <Button>Chat</Button>
            <Button>Shop Info</Button>
          </ActionButtons>
        </StoreProfile>

        <ProductGrid>
          {[
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
          ].map((product, index) => (
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
