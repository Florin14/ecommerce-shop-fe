import { styled } from "@mui/material";
import {
  Search,
  ShoppingCart,
  Favorite,
  Person,
  Settings,
  History,
  Store,
  Edit,
} from "@mui/icons-material";
import V0Navbar from "../../generic-components/V0Navbar/V0Navbar";

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

const ProfileContainer = styled("div")`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  color: white;
`;

const ProfileHeader = styled("div")`
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
  background: #2a2a2a;
  border-radius: 8px;
  margin-bottom: 2rem;
`;

const ProfileStats = styled("div")`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const StatCard = styled("div")`
  background: #2a2a2a;
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;

  h3 {
    color: #999;
    margin: 0 0 0.5rem 0;
  }

  p {
    font-size: 1.5rem;
    margin: 0;
  }
`;

const Section = styled("section")`
  margin-bottom: 2rem;
`;

const SectionHeader = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const BrandGrid = styled("div")`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
`;

const BrandCard = styled("div")`
  background: #2a2a2a;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }

  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-bottom: 0.5rem;
  }
`;

const RecentOrders = styled("div")`
  display: grid;
  gap: 1rem;
`;

const OrderCard = styled("div")`
  background: #2a2a2a;
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CustomerProfile = () => {
  return (
    <>
      <V0Navbar />
      <ProfileContainer>
        <ProfileHeader>
          <img
            src="/placeholder.svg?height=120&width=120"
            alt="Profile"
            style={{ borderRadius: "50%" }}
          />
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <h2 style={{ margin: 0 }}>John Doe</h2>
              <Edit style={{ cursor: "pointer", fontSize: "1.2rem" }} />
            </div>
            <p style={{ color: "#999", margin: "0.5rem 0" }}>
              john.doe@example.com
            </p>
            <p style={{ color: "#999", margin: "0.5rem 0" }}>
              Member since: January 2023
            </p>
          </div>
          <button
            style={{
              marginLeft: "auto",
              background: "none",
              border: "1px solid #999",
              color: "white",
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <Settings /> Account Settings
          </button>
        </ProfileHeader>

        <ProfileStats>
          <StatCard>
            <h3>Total Orders</h3>
            <p>47</p>
          </StatCard>
          <StatCard>
            <h3>Wishlist Items</h3>
            <p>23</p>
          </StatCard>
          <StatCard>
            <h3>Reviews Written</h3>
            <p>15</p>
          </StatCard>
          <StatCard>
            <h3>Total Spent</h3>
            <p>$3,487</p>
          </StatCard>
        </ProfileStats>

        <Section>
          <SectionHeader>
            <h2>Favorite Brands</h2>
            <Store />
          </SectionHeader>
          <BrandGrid>
            {["Apple", "Samsung", "Nike", "Adidas", "Sony", "LG"].map(
              (brand) => (
                <BrandCard key={brand}>
                  <img src="/placeholder.svg?height=80&width=80" alt={brand} />
                  <p>{brand}</p>
                </BrandCard>
              )
            )}
          </BrandGrid>
        </Section>

        <Section>
          <SectionHeader>
            <h2>Recent Orders</h2>
            <History />
          </SectionHeader>
          <RecentOrders>
            {[
              { id: 1, date: "2024-01-15", items: 3, total: 250 },
              { id: 2, date: "2024-01-10", items: 1, total: 120 },
              { id: 3, date: "2024-01-05", items: 2, total: 180 },
            ].map((order) => (
              <OrderCard key={order.id}>
                <div>
                  <h3 style={{ margin: 0 }}>Order #{order.id}</h3>
                  <p style={{ color: "#999", margin: "0.5rem 0" }}>
                    {order.date}
                  </p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ margin: 0 }}>{order.items} items</p>
                  <p style={{ margin: "0.5rem 0", color: "#4CAF50" }}>
                    ${order.total}
                  </p>
                </div>
              </OrderCard>
            ))}
          </RecentOrders>
        </Section>
      </ProfileContainer>
    </>
  );
};

export default CustomerProfile;
