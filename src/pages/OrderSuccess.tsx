import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { CheckCircle, Package, ShoppingBag } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function OrderSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order_id");
  const bg = useColorModeValue("white", "gray.800");

  return (
    <Container maxW="container.md" py={20}>
      <Box bg={bg} p={12} borderRadius="2xl" shadow="lg" textAlign="center">
        <Box color="green.500" mb={6}>
          <CheckCircle size={80} style={{ margin: "0 auto" }} />
        </Box>
        <Heading size="xl" mb={3}>
          Payment Successful!
        </Heading>
        <Text color="gray.500" fontSize="lg" mb={2}>
          Thank you for your purchase.
        </Text>
        {orderId && (
          <Text color="gray.400" fontSize="sm" mb={8}>
            Order #{orderId}
          </Text>
        )}
        <Text color="gray.500" mb={8}>
          You'll receive a confirmation email shortly with your order details.
        </Text>
        <HStack justify="center" spacing={4}>
          <Button
            variant="primary"
            size="lg"
            leftIcon={<Package size={20} />}
            onClick={() => navigate("/profile?tab=orders")}
          >
            View Orders
          </Button>
          <Button
            variant="secondary"
            size="lg"
            leftIcon={<ShoppingBag size={20} />}
            onClick={() => navigate("/catalog")}
          >
            Continue Shopping
          </Button>
        </HStack>
      </Box>
    </Container>
  );
}
