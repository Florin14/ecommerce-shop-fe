import {
  Box, Container, Flex, HStack, IconButton, Text, Badge,
  useColorMode, useColorModeValue, useDisclosure,
  Avatar, Menu, MenuButton, MenuList, MenuItem, MenuDivider, Button,
} from "@chakra-ui/react";
import { Search, ShoppingCart, Heart, Sun, Moon, User, LogOut, Settings, Package, LayoutDashboard } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";
import { useOS } from "../../hooks/useOS";
import { CartDrawer } from "../cart/CartDrawer";

export function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const os = useOS();
  const { isOpen: isCartOpen, onOpen: onCartOpen, onClose: onCartClose } = useDisclosure();

  const navBg = useColorModeValue("rgba(250,250,249,0.6)", "rgba(9,9,11,0.6)");
  const border = useColorModeValue("volt.lightBorder", "volt.border");
  const muted = useColorModeValue("gray.400", "volt.muted");

  const openCmd = () => {
    const isMac = os.isMac;
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: isMac, ctrlKey: !isMac }));
  };

  return (
    <>
      <Box h="64px" />
      <Box
        as="nav" position="fixed" top={2} left={2} right={2} zIndex={100}
        bg={navBg} backdropFilter="blur(20px) saturate(1.6)"
        borderRadius="xl" border="1px solid" borderColor={border}
      >
        <Container maxW="container.xl" py={2}>
          <Flex align="center" justify="space-between">
            {/* Wordmark */}
            <Link to="/">
              <Text
                fontFamily="heading" fontSize="md" fontWeight="700" letterSpacing="-0.04em"
                _hover={{ opacity: 0.7 }} transition="opacity 0.15s"
              >
                GRIFO
                <Text as="span" color="volt.lime">.</Text>
              </Text>
            </Link>

            {/* Command trigger */}
            <HStack
              as="button" onClick={openCmd}
              bg={useColorModeValue("blackAlpha.50", "whiteAlpha.50")}
              border="1px solid" borderColor={border}
              borderRadius="lg" px={3} py={1.5} spacing={3} cursor="pointer"
              transition="all 0.15s"
              _hover={{ borderColor: useColorModeValue("blackAlpha.200", "whiteAlpha.100") }}
              display={{ base: "none", md: "flex" }} w="240px"
            >
              <HStack spacing={2} flex={1}>
                <Search size={13} opacity={0.35} />
                <Text fontSize="xs" color={muted} fontWeight="400" fontFamily="body">
                  Search or ask AI...
                </Text>
              </HStack>
              <Box
                bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
                borderRadius="md" px={1.5} py={0.5}
              >
                <Text fontSize="2xs" color={muted} fontFamily="heading" fontWeight="600">
                  {os.mod}K
                </Text>
              </Box>
            </HStack>

            {/* Actions */}
            <HStack spacing={0}>
              <IconButton
                aria-label="Search" icon={<Search size={16} />} variant="ghost" borderRadius="lg" size="sm"
                display={{ base: "flex", md: "none" }} onClick={openCmd}
              />
              <IconButton
                aria-label="Theme" icon={colorMode === "light" ? <Moon size={15} /> : <Sun size={15} />}
                variant="ghost" borderRadius="lg" size="sm" onClick={toggleColorMode}
              />
              {isAuthenticated && (
                <IconButton aria-label="Wishlist" icon={<Heart size={15} />} variant="ghost" borderRadius="lg" size="sm" onClick={() => navigate("/profile?tab=wishlist")} />
              )}
              <Box position="relative">
                <IconButton aria-label="Cart" icon={<ShoppingCart size={15} />} variant="ghost" borderRadius="lg" size="sm" onClick={onCartOpen} />
                {itemCount > 0 && (
                  <Badge
                    bg="volt.lime" color="volt.bg" borderRadius="full" position="absolute"
                    top={-0.5} right={-0.5} fontSize="2xs" minW={3.5} h={3.5}
                    display="flex" alignItems="center" justifyContent="center" fontWeight="700" px={1}
                  >
                    {itemCount}
                  </Badge>
                )}
              </Box>

              {isAuthenticated ? (
                <Menu>
                  <MenuButton ml={1}>
                    <Avatar size="xs" name={user?.full_name} src={user?.profile_picture_url || undefined} cursor="pointer" />
                  </MenuButton>
                  <MenuList py={2}>
                    <Box px={4} py={2}>
                      <Text fontWeight="700" fontSize="sm" fontFamily="heading">{user?.full_name}</Text>
                      <Text fontSize="xs" color={muted}>{user?.username}</Text>
                    </Box>
                    <MenuDivider />
                    <MenuItem icon={<User size={14} />} onClick={() => navigate("/profile")}>Profile</MenuItem>
                    <MenuItem icon={<Package size={14} />} onClick={() => navigate("/profile?tab=orders")}>Orders</MenuItem>
                    {isAdmin && <MenuItem icon={<LayoutDashboard size={14} />} onClick={() => navigate("/admin")}>Admin</MenuItem>}
                    <MenuItem icon={<Settings size={14} />} onClick={() => navigate("/profile?tab=settings")}>Settings</MenuItem>
                    <MenuDivider />
                    <MenuItem icon={<LogOut size={14} />} onClick={logout} color="red.400">Logout</MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <HStack spacing={1.5} ml={2}>
                  <Button size="xs" variant="ghost" borderRadius="lg" onClick={() => navigate("/login")} fontSize="xs">
                    Sign In
                  </Button>
                  <Button size="xs" variant="volt" borderRadius="lg" onClick={() => navigate("/register")} fontSize="xs" px={4} h="28px">
                    Sign Up
                  </Button>
                </HStack>
              )}
            </HStack>
          </Flex>
        </Container>
      </Box>
      <CartDrawer isOpen={isCartOpen} onClose={onCartClose} />
    </>
  );
}
