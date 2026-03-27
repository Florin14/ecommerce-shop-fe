import {
  Badge,
  Box,
  Flex,
  Heading,
  Select,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useGetOrdersQuery, useUpdateOrderMutation } from "../../store/api/ordersApi";

const stateColors: Record<string, string> = {
  PENDING: "yellow", PROCESSING: "blue", SHIPPED: "purple",
  DELIVERED: "green", CANCELED: "red", RETURNED: "orange",
};

const nextStates: Record<string, string[]> = {
  PENDING: ["PROCESSING", "CANCELED"],
  PROCESSING: ["SHIPPED", "CANCELED"],
  SHIPPED: ["DELIVERED", "RETURNED"],
  DELIVERED: ["RETURNED"],
};

export default function AdminOrders() {
  const { data: orders } = useGetOrdersQuery();
  const [updateOrder] = useUpdateOrderMutation();
  const toast = useToast();
  const bg = useColorModeValue("white", "gray.800");

  const handleStateChange = async (orderId: number, newState: string) => {
    try {
      await updateOrder({ id: orderId, order_state: newState }).unwrap();
      toast({ title: `Order updated to ${newState}`, status: "success", duration: 2000 });
    } catch {
      toast({ title: "Failed to update order", status: "error", duration: 2000 });
    }
  };

  return (
    <Box>
      <Heading size="lg" mb={6}>Orders</Heading>
      <Box bg={bg} borderRadius="2xl" shadow="sm" overflow="hidden">
        <Box overflowX="auto">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Order ID</Th>
                <Th>Date</Th>
                <Th>Items</Th>
                <Th>Total</Th>
                <Th>Status</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {orders?.map((order) => (
                <Tr key={order.id}>
                  <Td fontWeight="600">#{order.id}</Td>
                  <Td fontSize="sm" color="gray.500">{new Date(order.order_date).toLocaleDateString()}</Td>
                  <Td>{order.order_items.length} items</Td>
                  <Td fontWeight="600">${order.total.toFixed(2)}</Td>
                  <Td>
                    <Badge colorScheme={stateColors[order.order_state] || "gray"} borderRadius="full">
                      {order.order_state}
                    </Badge>
                  </Td>
                  <Td>
                    {nextStates[order.order_state]?.length ? (
                      <Select
                        size="sm"
                        borderRadius="full"
                        maxW="160px"
                        placeholder="Change status"
                        onChange={(e) => handleStateChange(order.id, e.target.value)}
                      >
                        {nextStates[order.order_state].map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </Select>
                    ) : (
                      <Text fontSize="sm" color="gray.400">Final</Text>
                    )}
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
