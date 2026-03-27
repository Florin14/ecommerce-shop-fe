import {
  Avatar,
  Box,
  Badge,
  Button,
  Container,
  Divider,
  Flex,
  Grid,
  Heading,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { Package, Heart, MapPin, User } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useGetOrdersQuery } from "../store/api/ordersApi";
import { useGetWishlistQuery } from "../store/api/wishlistApi";
import { useGetAddressesQuery } from "../store/api/addressesApi";

const stateColors: Record<string, string> = {
  PENDING: "yellow",
  PROCESSING: "blue",
  SHIPPED: "purple",
  DELIVERED: "green",
  CANCELED: "red",
  RETURNED: "orange",
};

export default function Profile() {
  const { user } = useAuth();
  const { data: orders } = useGetOrdersQuery();
  const { data: wishlist } = useGetWishlistQuery();
  const { data: addresses } = useGetAddressesQuery();
  const bg = useColorModeValue("white", "gray.800");

  if (!user) return null;

  return (
    <Container maxW="container.xl" py={8}>
      {/* Profile Header */}
      <Flex bg={bg} p={8} borderRadius="2xl" shadow="sm" align="center" gap={6} mb={8} direction={{ base: "column", md: "row" }}>
        <Avatar size="xl" name={user.full_name} src={user.profile_picture_url || undefined} />
        <Box textAlign={{ base: "center", md: "left" }}>
          <Heading size="lg">{user.full_name}</Heading>
          <Text color="gray.500">{user.username}</Text>
          {user.description && <Text mt={2} color="gray.600">{user.description}</Text>}
        </Box>
        <Badge ml={{ md: "auto" }} colorScheme="purple" borderRadius="full" px={4} py={1}>
          {user.role}
        </Badge>
      </Flex>

      {/* Tabs */}
      <Tabs variant="soft-rounded" colorScheme="brand">
        <TabList mb={6} flexWrap="wrap" gap={2}>
          <Tab borderRadius="full"><HStack><Package size={16} /><Text>Orders</Text></HStack></Tab>
          <Tab borderRadius="full"><HStack><Heart size={16} /><Text>Wishlist</Text></HStack></Tab>
          <Tab borderRadius="full"><HStack><MapPin size={16} /><Text>Addresses</Text></HStack></Tab>
          <Tab borderRadius="full"><HStack><User size={16} /><Text>Settings</Text></HStack></Tab>
        </TabList>

        <TabPanels>
          {/* Orders */}
          <TabPanel px={0}>
            <VStack spacing={4} align="stretch">
              {orders?.length === 0 && <Text color="gray.400" textAlign="center" py={10}>No orders yet</Text>}
              {orders?.map((order) => (
                <Box key={order.id} bg={bg} p={6} borderRadius="2xl" shadow="sm">
                  <Flex justify="space-between" align="center" mb={3}>
                    <HStack>
                      <Text fontWeight="bold">Order #{order.id}</Text>
                      <Badge colorScheme={stateColors[order.order_state] || "gray"} borderRadius="full">
                        {order.order_state}
                      </Badge>
                    </HStack>
                    <Text fontSize="sm" color="gray.500">{new Date(order.order_date).toLocaleDateString()}</Text>
                  </Flex>
                  <VStack align="stretch" spacing={2}>
                    {order.order_items.map((item) => (
                      <Flex key={item.id} justify="space-between" fontSize="sm">
                        <Text>{item.product_name} (Size: {item.size_name}) x{item.quantity}</Text>
                        <Text fontWeight="500">${(item.unit_price * item.quantity).toFixed(2)}</Text>
                      </Flex>
                    ))}
                  </VStack>
                  <Divider my={3} />
                  <Flex justify="space-between" fontWeight="bold">
                    <Text>Total</Text>
                    <Text color="brand.500">${order.total.toFixed(2)}</Text>
                  </Flex>
                </Box>
              ))}
            </VStack>
          </TabPanel>

          {/* Wishlist */}
          <TabPanel px={0}>
            <Text color="gray.400" textAlign="center" py={10}>
              {wishlist?.length === 0 ? "Your wishlist is empty" : `${wishlist?.length} items in wishlist`}
            </Text>
          </TabPanel>

          {/* Addresses */}
          <TabPanel px={0}>
            <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
              {addresses?.map((addr) => (
                <Box key={addr.id} bg={bg} p={5} borderRadius="xl" shadow="sm" border={addr.is_default ? "2px solid" : "1px solid"} borderColor={addr.is_default ? "brand.500" : useColorModeValue("gray.200", "gray.700")}>
                  {addr.is_default && <Badge colorScheme="purple" mb={2} borderRadius="full">Default</Badge>}
                  <Text fontWeight="600">{addr.full_name}</Text>
                  <Text fontSize="sm" color="gray.500">{addr.street}</Text>
                  <Text fontSize="sm" color="gray.500">{addr.city}, {addr.state} {addr.zip_code}</Text>
                  <Text fontSize="sm" color="gray.500">{addr.country}</Text>
                </Box>
              ))}
            </Grid>
            {(!addresses || addresses.length === 0) && (
              <Text color="gray.400" textAlign="center" py={10}>No addresses saved</Text>
            )}
          </TabPanel>

          {/* Settings */}
          <TabPanel px={0}>
            <Box bg={bg} p={6} borderRadius="2xl" shadow="sm">
              <Text color="gray.500">Account settings will be available here.</Text>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
}
