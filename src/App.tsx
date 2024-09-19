import React from "react";
import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { LoadingScreen, AlreadyAuth } from "./utils/app-utils";
// import { LogoutRedirect } from '../login/LogoutRedirect'
// import { NotFound } from '../layout/errorPages'
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { theme } from "./utils/theme";
import { Snackbar } from "./components/generic-components/Snackbar";
import { Layout } from "./containers";
import { NotFound } from "./containers/NotFound";
import ProductDetailPage from "./components/pages/ProductDetailPage/ProductDetailPage";

const LoginPage = React.lazy(() => import("./components/Login/LoginPage"));

const RegisterPage = React.lazy(
  () => import("./components/Login/RegisterPage")
);

const WelcomePage = React.lazy(
  () => import("./components/pages/Welcome/WelcomePage")
);
const ProfilePage = React.lazy(
  () => import("./components/pages/ProfilePage/Profile")
);
const ProductsPage = React.lazy(
  () => import("./components/pages/ProductsPage/Products")
);

const CategoriesPage = React.lazy(
  () => import("./components/pages/CategoriesPage/Categories")
);

const BrandsPage = React.lazy(
  () => import("./components/pages/BrandsPage/Brands")
);

const UserPage = React.lazy(
  () => import("./components/pages/UserPage/User")
);
// const AssignmentsPage = React.lazy(() => import('../assignments/AssignmentsPage'))
// const AnnouncementsPage = React.lazy(() => import('../announcements/AnnouncementsPage'))

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/admin/products",
        element: <ProductsPage />,
      },
      {
        path: "/admin/categories",
        element: <CategoriesPage />,
      },
      {
        path: "/admin/brands",
        element: <BrandsPage />,
      },
      {
        path: "/admin/users",
        element: <UserPage />,
      },
      {
        path: "/admin/products/:productId",
        element: <ProductDetailPage />, // Replace with the actual component for product details
      },
      // {
      //   path: '/logout',
      //   element: <LogoutRedirect redirectAfterLogoutTo={"/"} />,
      // },
    ],
  },
  { path: "/register", element: <RegisterPage /> },
  {
    path: "/",
    element: (
      <AlreadyAuth redirectTo={"/admin/products"}>
        <LoadingScreen>
          <WelcomePage />
        </LoadingScreen>
      </AlreadyAuth>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const App = () => {
  // Axios.defaults.baseURL = "http://localhost:8080";
  // Axios.defaults.httpsAgent = new https.Agent({rejectUnauthorized: false});
  // Axios.defaults.headers.common["X-Continue-Loading"] = true;
  // Axios.defaults.headers.common["X-Loading"] = true;
  // Axios.defaults.withCredentials = true;
  return (
    <React.Fragment>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          {/* <LocalizationProvider dateAdapter={AdapterDayjs}> */}
          <RouterProvider router={router} />
          {/* <CssBaseline /> */}
          {/* <Snackbar /> */}
          {/* </LocalizationProvider> */}
        </ThemeProvider>
      </StyledEngineProvider>
    </React.Fragment>
  );
};

export default App;
