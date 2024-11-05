import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { styled } from "@mui/material";
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  LogOut,
  FileText,
  Settings,
} from "lucide-react";

const V0Navbar = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleUserMenuClick = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleProfile = () => {
    navigate("/admin/profile");
  };

  const handleOrders = () => {
    navigate("/admin/orders");
  };
  return (
    <Header>
      <Logo
        onClick={() => {
          navigate("/admin/products");
        }}
      >
        Z-Flo Market
      </Logo>
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
  );
};

export default V0Navbar;

const Header = styled("header")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  border-bottom: 1px solid #333;
  background: #1a1a1a;
  color: white;
`;

const Logo = styled("div")`
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  cursor: pointer;
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
