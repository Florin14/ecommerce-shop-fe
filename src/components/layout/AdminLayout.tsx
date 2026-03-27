import {
  Box,
  Container,
  Flex,
  HStack,
  IconButton,
  Text,
  VStack,
  useColorModeValue,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
} from "@chakra-ui/react";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Tags,
  Layers,
  Menu,
  ChevronLeft,
} from "lucide-react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
  { icon: Package, label: "Products", path: "/admin/products" },
  { icon: ShoppingCart, label: "Orders", path: "/admin/orders" },
  { icon: Users, label: "Users", path: "/admin/users" },
  { icon: Tags, label: "Brands", path: "/admin/brands" },
  { icon: Layers, label: "Categories", path: "/admin/categories" },
];

function SidebarContent() {
  const location = useLocation();
  const activeBg = useColorModeValue("brand.50", "brand.900");
  const activeColor = useColorModeValue("brand.700", "brand.200");
  const hoverBg = useColorModeValue("gray.100", "gray.700");

  return (
    <VStack spacing={1} align="stretch" py={4}>
      {sidebarItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link key={item.path} to={item.path}>
            <HStack
              px={4}
              py={3}
              borderRadius="xl"
              bg={isActive ? activeBg : "transparent"}
              color={isActive ? activeColor : undefined}
              fontWeight={isActive ? "600" : "400"}
              _hover={{ bg: isActive ? activeBg : hoverBg }}
              transition="all 0.15s"
            >
              <item.icon size={20} />
              <Text fontSize="sm">{item.label}</Text>
            </HStack>
          </Link>
        );
      })}
    </VStack>
  );
}

export function AdminLayout() {
  const bg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  return (
    <Flex direction="column" minH="100vh">
      <Navbar />
      <Flex flex={1}>
        {/* Desktop Sidebar */}
        <Box
          w="240px"
          bg={bg}
          borderRight="1px"
          borderColor={borderColor}
          display={{ base: "none", lg: "block" }}
          position="sticky"
          top="65px"
          h="calc(100vh - 65px)"
          overflowY="auto"
        >
          <Box px={3}>
            <HStack px={4} py={4} cursor="pointer" onClick={() => navigate("/")} color="gray.500" _hover={{ color: "brand.500" }}>
              <ChevronLeft size={16} />
              <Text fontSize="sm">Back to Store</Text>
            </HStack>
            <SidebarContent />
          </Box>
        </Box>

        {/* Mobile Menu Button */}
        <IconButton
          aria-label="Open menu"
          icon={<Menu size={20} />}
          display={{ base: "flex", lg: "none" }}
          position="fixed"
          bottom={4}
          right={4}
          zIndex={10}
          variant="primary"
          borderRadius="full"
          size="lg"
          shadow="lg"
          onClick={onOpen}
        />

        {/* Mobile Drawer */}
        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerBody pt={12}>
              <SidebarContent />
            </DrawerBody>
          </DrawerContent>
        </Drawer>

        {/* Main Content */}
        <Box flex={1} p={{ base: 4, md: 8 }}>
          <Container maxW="container.xl">
            <Outlet />
          </Container>
        </Box>
      </Flex>
    </Flex>
  );
}
