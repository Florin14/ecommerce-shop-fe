import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  styled,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { DrawerComp } from "./DrawerComp";
// import { SearchBar } from '../SearchBar/SearchBar'
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
// import { toggleSidebar } from '../../application/slice'
// import { useAppDispatch } from '../../../redux/hooks'

export const NavBar: React.FC = () => {
  const [showNotificationsMenu, setShowNotificationsMenu] = useState(false);
  const [showMessagesMenu, setShowMessagesMenu] = useState(false);

  // const dispatch = useAppDispatch()
  const user = localStorage.getItem("user");
  const navigate = useNavigate();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const openNotificationsMenu = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(event.currentTarget);
    setShowNotificationsMenu(!showNotificationsMenu);
  };

  const openMessagesMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setShowMessagesMenu(!showMessagesMenu);
  };

  // const handleSelectedNotification = () => {
  //   //TO DO
  //   setAnchorEl(null)
  // }

  // const handleSelectedMessage = () => {
  //   //TO DO
  //   setAnchorEl(null)
  // };

  return (
    <Container className="navbar-wrapper">
      {isMatch ? (
        <>
          <StyledIconButton size="large" onClick={() => {}}>
            <MenuIcon />
          </StyledIconButton>
          <FancyText variant="h5">Colectivistii</FancyText>
          <DrawerComp />
        </>
      ) : (
        <NavContainer className="navbar-container">
          <LeftSection className="navbar-left-section">
            {/* <FancyText variant="h5">Colectivistii</FancyText> */}
          </LeftSection>
          {/* <SearchBar /> */}
          <RightSection className="navbar-right-section">
            <RightButtonsSection>
              <Tooltip title="Notifications">
                <ButtonWrapper>
                  <StyledIconButton
                    size="large"
                    onClick={openNotificationsMenu}
                    // disabled
                  >
                    <NotificationsIcon />
                  </StyledIconButton>
                </ButtonWrapper>
              </Tooltip>
              <Tooltip title="Messages">
                <StyledIconButton size="large" onClick={openMessagesMenu}>
                  <MailIcon />
                </StyledIconButton>
              </Tooltip>
              {!user && (
                <Tooltip title="Sign out">
                  <StyledIconButton
                    size="large"
                    onClick={() => navigate("/logout")}
                  >
                    <LogoutIcon />
                  </StyledIconButton>
                </Tooltip>
              )}
            </RightButtonsSection>
            <SignupButton onClick={() => navigate("/register")}>
              Inscrieti-va
            </SignupButton>
            <LoginButton onClick={() => navigate("/login")}>
              Intrati in cont
            </LoginButton>
          </RightSection>
        </NavContainer>
      )}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{ marginTop: "10px", maxWidth: "300px", maxHeigh: "500px" }}
        disableScrollLock={true}
      >
        {/* {showNotificationsMenu && notifications.length !== 0 ? (
          notifications.map((n, index) => (
            <MenuItem key={index} onClick={handleSelectedNotification}>
              {n}
            </MenuItem>
          ))
        ) : (
          <p>NU AVETI NICIO NOTIFICARE</p>
        )} */}
        {/* showMessagesMenu &&{messages.length!==0 ? (messages.map((m, index) => (
            <MenuItem key={index} onClick={handleSelectedMessage}>{m}</MenuItem>))) :
            (<p>NU AVETI NICIUN MESAJ</p>)
          } */}
      </Menu>
    </Container>
  );
};

const Container = styled("div")`
  width: 100%;
  height: 70px;
  // background: #303030;
  // background: black;
  color: #777;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  text-align: center;

  top: 10px;
  position: fixed;
  z-index: 2;
  @media screen and (max-width: 960px) {
    width: 100%;
    left: 0;
  }
`;

const NavContainer = styled("div")`
  display: flex;
  width: 90%;
  justify-content: space-between;
  height: inherit;
  align-items: center;
  background: black;
  border-radius: 10px;
  padding: 0px 20px;
`;

const FancyText = styled(Typography)`
  display: flex;
  font-family: "PT Sans", cursive;
  color: ${(props) => props.theme.palette.common.white};
  font-weight: bold;
  justify-content: center;
`;

const RightSection = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  // height: inherit;
  gap: 30px;
  order: 3;
  // background: #303030;
`;

const LeftSection = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  height: inherit;
  order: 1;
  gap: 20px;
  background: #303030;
  border-radius: 10px;
  // padding: 0 10px;
`;

const StyledIconButton = styled(IconButton)`
  color: white;
`;

const ButtonWrapper = styled("span")``;

const RightButtonsSection = styled("div")``;

const LoginButton = styled("button")`
  color: #11998e;
  font-size: 14px;
  border: 1px solid #11998e;
  background: transparent;
  padding: 10px;
  border-radius: 30px;
  cursor: pointer;
`;

const SignupButton = styled("button")`
  color: white;
  font-size: 14px;
  background: transparent;
  border: 0;
  text-decoration: underline;
  cursor: pointer;
`;
