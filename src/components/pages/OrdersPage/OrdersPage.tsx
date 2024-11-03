import { styled } from "@mui/material";
import { Search, ShoppingCart, Favorite, Person } from "@mui/icons-material";

// Styled Components
const Header = styled("header")`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: #1a1a1a;
  color: white;
`;

const Logo = styled("h1")`
  margin: 0;
  font-size: 1.5rem;
`;

const SearchBar = styled("div")`
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  padding: 0.5rem 1rem;
  flex: 0 1 400px;

  input {
    background: none;
    border: none;
    color: white;
    width: 100%;
    margin-left: 0.5rem;
    &::placeholder {
      color: rgba(255, 255, 255, 0.7);
    }
  }
`;

const HeaderActions = styled("div")`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const MoneyDisplay = styled("span")`
  margin-right: 1rem;
`;

const Layout = styled("div")`
  display: grid;
  grid-template-columns: 240px 1fr;
  min-height: 100vh;
`;

const Sidebar = styled("aside")`
  padding: 1rem;
  background: #242424;
  color: white;
`;

const CategoryList = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const PriceFilter = styled("div")`
  margin-top: 2rem;
`;

const MainContent = styled("main")`
  padding: 1rem;
`;

const StoreProfile = styled("div")`
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
  background: #2a2a2a;
  border-radius: 8px;
  margin-bottom: 2rem;
`;

const ProductGrid = styled("div")`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const ProductCard = styled("div")`
  background: #2a2a2a;
  border-radius: 8px;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
`;

const ProductInfo = styled("div")`
  padding: 1rem;
  color: white;
`;

const ButtonGroup = styled("div")`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  padding: 1rem;
`;

const Button = styled("button")<{ variant?: "primary" | "secondary" }>`
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background: ${(props) =>
    props.variant === "primary" ? "#4a4a4a" : "#2a2a2a"};
  color: white;
  border: 1px solid
    ${(props) => (props.variant === "primary" ? "transparent" : "#4a4a4a")};

  &:hover {
    opacity: 0.9;
  }
`;

const OrdersPage = () => {
  return (
    <>
      <Header>
        <Logo>GARTEX</Logo>
        <SearchBar>
          <Search />
          <input placeholder="Search" />
        </SearchBar>
        <HeaderActions>
          <MoneyDisplay>Money: $2,250,100.00</MoneyDisplay>
          <Favorite />
          <ShoppingCart />
          <Person />
        </HeaderActions>
      </Header>

      <Layout>
        <Sidebar>
          <h3>CATEGORY</h3>
          <CategoryList>
            <label>
              <input type="checkbox" /> Living
            </label>
            <label>
              <input type="checkbox" /> Auto
            </label>
            <label>
              <input type="checkbox" checked /> Gadget
            </label>
          </CategoryList>

          <PriceFilter>
            <h3>PRICE</h3>
            <CategoryList>
              <label>
                <input type="checkbox" /> $0 - $500
              </label>
              <label>
                <input type="checkbox" /> $501 - $1000
              </label>
              <label>
                <input type="checkbox" /> $1001 - $2000
              </label>
              <label>
                <input type="checkbox" /> $2001+
              </label>
            </CategoryList>
          </PriceFilter>
        </Sidebar>

        <MainContent>
          <StoreProfile>
            <img
              src="/placeholder.svg?height=80&width=80"
              alt="Store Profile"
              style={{ borderRadius: "50%" }}
            />
            <div>
              <h2>Apple Official Store ✓</h2>
              <p>San Francisco</p>
              <div style={{ display: "flex", gap: "2rem", color: "#999" }}>
                <span>Products: 100</span>
                <span>Followers: 500.13k</span>
                <span>Rating: 4.9 (10.2k Reviews)</span>
                <span>Joined: 9 years ago</span>
                <span>Chat Performance: 99%</span>
              </div>
            </div>
            <div style={{ marginLeft: "auto", display: "flex", gap: "1rem" }}>
              <Button>Follow</Button>
              <Button>Chat</Button>
              <Button>Shop Info</Button>
            </div>
          </StoreProfile>

          <ProductGrid>
            {[
              { id: 1, name: "Tricou", price: 120, originalPrice: 120 },
              { id: 2, name: "tricou de fotbal", price: 50, originalPrice: 50 },
              { id: 3, name: "Bluza", price: 60, originalPrice: 60 },
            ].map((product) => (
              <ProductCard key={product.id}>
                <Favorite
                  style={{
                    position: "absolute",
                    right: "1rem",
                    top: "1rem",
                    color: "white",
                  }}
                />
                <img
                  src="/placeholder.svg?height=200&width=200"
                  alt={product.name}
                />
                <ProductInfo>
                  <h3>{product.name}</h3>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <span>${product.price}</span>
                    {product.originalPrice > product.price && (
                      <span
                        style={{
                          textDecoration: "line-through",
                          color: "#999",
                        }}
                      >
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                </ProductInfo>
                <ButtonGroup>
                  <Button variant="primary">Add to Cart</Button>
                  <Button>Buy Now</Button>
                </ButtonGroup>
              </ProductCard>
            ))}
          </ProductGrid>
        </MainContent>
      </Layout>
    </>
  );
};

export default OrdersPage;
