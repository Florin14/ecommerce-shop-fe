import React, { useState } from "react";
import { Outlet } from "react-router-dom";
// import { LoadingScreen } from '../application/utils'
// import { useAppDispatch, useAppSelector } from '../../redux/hooks'
// import { displaySnackbar } from '../application/slice'
import { styled } from "@mui/material";
// import { Sidebar } from '../common/Sidebar'
// import { selectUserData } from '../account/selectors'
// import { fetchUserAvatar, fetchUserData } from '../account/actions'
import { NavBar } from "../components/generic-components/Navbar";
import { LoadingScreen } from "../utils/app-utils";
import { AquabisSidebar } from "../components/generic-components/Sidebar/AquabisSidebar";
import AppleStore from "../components/pages/AppleStore/AppleStore";
// import NavbarAdmin from "../components/generic-components/NavbarTop";
export const Layout: React.FC = () => {
  // const dispatch = useAppDispatch()
  // const userData = useAppSelector(selectUserData)


  // if (!isAuthenticated) {
  //   dispatch(
  //     displaySnackbar({
  //       open: true,
  //       type: 'warning',
  //       message: 'You do not have permission to access this page',
  //     })
  //   )

  //   return <Navigate to={"/"} />
  // }

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <LoadingScreen>
      <Page>
        <Container>
          <Content>
            <Outlet />
          </Content>
        </Container>
      </Page>
    </LoadingScreen>
  );
};

const Page = styled("div")`
  width: 100%;
  min-height: 100%;
  background-color: #a3a0a0;
`;

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Content = styled("div")`
  width: 100%;
  // display: flex;
  position: relative;
  height: 100%;
  // align-self: center;
  gap: 20px;
  // padding: 0 20px 20px 440px;

  @media screen and (max-width: 960px) {
    width: 100%;
    left: 0;
  }
`;
