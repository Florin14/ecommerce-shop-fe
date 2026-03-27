import React, { Suspense } from "react";
import { ChakraProvider, Box, Center, Text, VStack } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { theme } from "./theme";
import { store } from "./store";
import { Layout } from "./components/layout/Layout";
import { AdminLayout } from "./components/layout/AdminLayout";

const Home = React.lazy(() => import("./pages/Home"));
const Catalog = React.lazy(() => import("./pages/Catalog"));
const ProductDetail = React.lazy(() => import("./pages/ProductDetail"));
const Login = React.lazy(() => import("./pages/Login"));
const Register = React.lazy(() => import("./pages/Register"));
const Checkout = React.lazy(() => import("./pages/Checkout"));
const Profile = React.lazy(() => import("./pages/Profile"));
const Dashboard = React.lazy(() => import("./pages/admin/Dashboard"));
const AdminProducts = React.lazy(() => import("./pages/admin/Products"));
const AdminOrders = React.lazy(() => import("./pages/admin/Orders"));
const AdminUsers = React.lazy(() => import("./pages/admin/Users"));
const AdminBrands = React.lazy(() => import("./pages/admin/Brands"));
const AdminCategories = React.lazy(() => import("./pages/admin/Categories"));
const OrderSuccess = React.lazy(() => import("./pages/OrderSuccess"));

const fadeIn = keyframes`
  0% { opacity: 0; transform: translateY(8px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const slideIn = keyframes`
  0% { transform: translateX(-100%); }
  50% { transform: translateX(0%); }
  100% { transform: translateX(100%); }
`;

const breathe = keyframes`
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
`;

function Loading() {
  return (
    <Center h="100vh" bg="volt.bg">
      <VStack spacing={6} animation={`${fadeIn} 0.4s ease-out`}>
        {/* Wordmark */}
        <Text
          fontFamily="heading"
          fontWeight="700"
          fontSize="2xl"
          letterSpacing="-0.05em"
          color="white"
        >
          GRIFO<Text as="span" color="volt.lime">.</Text>
        </Text>

        {/* Animated progress bar */}
        <Box w="120px" h="2px" bg="whiteAlpha.100" borderRadius="full" overflow="hidden" position="relative">
          <Box
            position="absolute"
            top={0}
            left={0}
            h="full"
            w="60%"
            bg="volt.lime"
            borderRadius="full"
            animation={`${slideIn} 1.2s cubic-bezier(0.4, 0, 0.2, 1) infinite`}
            shadow="0 0 12px rgba(200, 255, 0, 0.4)"
          />
        </Box>

        {/* Subtitle */}
        <Text
          fontSize="2xs"
          color="volt.muted"
          fontFamily="body"
          letterSpacing="0.1em"
          textTransform="uppercase"
          animation={`${breathe} 2s ease-in-out infinite`}
        >
          Loading
        </Text>
      </VStack>
    </Center>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = store.getState().auth.isAuthenticated;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/catalog", element: <Catalog /> },
      { path: "/product/:id", element: <ProductDetail /> },
      { path: "/checkout", element: <ProtectedRoute><Checkout /></ProtectedRoute> },
      { path: "/profile", element: <ProtectedRoute><Profile /></ProtectedRoute> },
      { path: "/order-success", element: <ProtectedRoute><OrderSuccess /></ProtectedRoute> },
    ],
  },
  {
    element: <ProtectedRoute><AdminLayout /></ProtectedRoute>,
    children: [
      { path: "/admin", element: <Dashboard /> },
      { path: "/admin/products", element: <AdminProducts /> },
      { path: "/admin/orders", element: <AdminOrders /> },
      { path: "/admin/users", element: <AdminUsers /> },
      { path: "/admin/brands", element: <AdminBrands /> },
      { path: "/admin/categories", element: <AdminCategories /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);

export default function App() {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Suspense fallback={<Loading />}>
          <RouterProvider router={router} />
        </Suspense>
      </ChakraProvider>
    </Provider>
  );
}
