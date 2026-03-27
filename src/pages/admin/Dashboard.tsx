import {
  Box,
  Grid,
  Heading,
  HStack,
  SimpleGrid,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Badge,
  useColorModeValue,
} from "@chakra-ui/react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { DollarSign, Package, ShoppingCart, Users } from "lucide-react";
import { useGetOrdersQuery } from "../../store/api/ordersApi";
import { useGetProductsQuery } from "../../store/api/productsApi";

const mockChartData = [
  { name: "Jan", revenue: 4000, orders: 24 },
  { name: "Feb", revenue: 3000, orders: 18 },
  { name: "Mar", revenue: 5000, orders: 35 },
  { name: "Apr", revenue: 4500, orders: 30 },
  { name: "May", revenue: 6000, orders: 42 },
  { name: "Jun", revenue: 5500, orders: 38 },
];

const stateColors: Record<string, string> = {
  PENDING: "yellow", PROCESSING: "blue", SHIPPED: "purple",
  DELIVERED: "green", CANCELED: "red", RETURNED: "orange",
};

export default function Dashboard() {
  const { data: orders } = useGetOrdersQuery();
  const { data: products } = useGetProductsQuery();
  const bg = useColorModeValue("white", "gray.800");
  const chartColor = useColorModeValue("#6366f1", "#818cf8");

  const totalRevenue = orders?.reduce((sum, o) => sum + o.total, 0) || 0;
  const totalOrders = orders?.length || 0;
  const totalProducts = products?.length || 0;

  const stats = [
    { icon: DollarSign, label: "Revenue", value: `$${totalRevenue.toFixed(2)}`, change: "+12.5%", color: "green" },
    { icon: ShoppingCart, label: "Orders", value: totalOrders.toString(), change: "+8.2%", color: "blue" },
    { icon: Package, label: "Products", value: totalProducts.toString(), change: "+3.1%", color: "purple" },
    { icon: Users, label: "Customers", value: "—", change: "", color: "orange" },
  ];

  return (
    <Box>
      <Heading size="lg" mb={8}>Dashboard</Heading>

      {/* Stats */}
      <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6} mb={8}>
        {stats.map((stat) => (
          <Box key={stat.label} bg={bg} p={6} borderRadius="2xl" shadow="sm">
            <HStack mb={3}>
              <Box p={2} bg={`${stat.color}.50`} borderRadius="lg" color={`${stat.color}.500`}>
                <stat.icon size={20} />
              </Box>
            </HStack>
            <Stat>
              <StatLabel color="gray.500" fontSize="sm">{stat.label}</StatLabel>
              <StatNumber fontSize="2xl">{stat.value}</StatNumber>
              {stat.change && (
                <StatHelpText mb={0}>
                  <StatArrow type="increase" />{stat.change}
                </StatHelpText>
              )}
            </Stat>
          </Box>
        ))}
      </SimpleGrid>

      {/* Charts */}
      <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={6} mb={8}>
        <Box bg={bg} p={6} borderRadius="2xl" shadow="sm">
          <Text fontWeight="600" mb={4}>Revenue Overview</Text>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={mockChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#a0aec0" fontSize={12} />
              <YAxis stroke="#a0aec0" fontSize={12} />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke={chartColor} strokeWidth={3} dot={{ fill: chartColor }} />
            </LineChart>
          </ResponsiveContainer>
        </Box>
        <Box bg={bg} p={6} borderRadius="2xl" shadow="sm">
          <Text fontWeight="600" mb={4}>Orders by Month</Text>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={mockChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#a0aec0" fontSize={12} />
              <YAxis stroke="#a0aec0" fontSize={12} />
              <Tooltip />
              <Bar dataKey="orders" fill={chartColor} radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Grid>

      {/* Recent Orders */}
      <Box bg={bg} borderRadius="2xl" shadow="sm" overflow="hidden">
        <Box p={6} pb={0}>
          <Text fontWeight="600">Recent Orders</Text>
        </Box>
        <Box overflowX="auto">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Order ID</Th>
                <Th>Date</Th>
                <Th>Items</Th>
                <Th>Total</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {orders?.slice(0, 10).map((order) => (
                <Tr key={order.id}>
                  <Td fontWeight="500">#{order.id}</Td>
                  <Td color="gray.500" fontSize="sm">{new Date(order.order_date).toLocaleDateString()}</Td>
                  <Td>{order.order_items.length} items</Td>
                  <Td fontWeight="600">${order.total.toFixed(2)}</Td>
                  <Td>
                    <Badge colorScheme={stateColors[order.order_state] || "gray"} borderRadius="full">
                      {order.order_state}
                    </Badge>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
    </Box>
  );
}
