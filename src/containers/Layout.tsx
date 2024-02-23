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
import { Sidebar } from "../components/generic-components/Sidebar";
import { LoadingScreen } from "../utils/app-utils";
import AquabisSidebar from "../components/generic-components/Sidebar/AquabisSidebar/AquabisSidebar";

export const Layout: React.FC = () => {
  // const dispatch = useAppDispatch()
  // const userData = useAppSelector(selectUserData)

  // useEffect(() => {
  //   if (!userData) {
  //     dispatch(fetchUserData())
  //     dispatch(fetchUserAvatar())
  //   }
  // }, [userData])

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
          <AquabisSidebar
            handleDrawerToggle={handleDrawerToggle}
            open={mobileOpen}
            // menuMinHeight={960}
          />
          <Content>
            <NavBar />
            <Outlet />
          </Content>
        </Container>
      </Page>
    </LoadingScreen>
  );
};

const Page = styled("div")`
  width: 100%;
  height: 100%;
`;

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  // gap: 40px;
  height: 100%;
`;

const Content = styled("div")`
  width: calc(100% - 260px);
  // display: flex;
  position: relative;
  left: 260px;
  height: 100%;

  // align-self: center;
  gap: 20px;
  // padding: 0 20px 20px 440px;

  @media screen and (max-width: 960px) {
    width: 100%;
    left: 0;
  }
`;
