import { styled } from "@mui/material";
import React from "react";
import { Check } from "lucide-react";

const V0StoreProfile = () => {
  return (
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
  );
};

export default V0StoreProfile;

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

