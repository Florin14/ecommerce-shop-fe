import { useState } from "react";
import {
  Box, Button, Container, Divider, Flex, FormControl, FormLabel, Grid, Heading, HStack, Image, Input,
  Step, StepIcon, StepIndicator, StepNumber, Stepper, StepSeparator, StepStatus, StepTitle,
  Text, useColorModeValue, useSteps, useToast, VStack,
} from "@chakra-ui/react";
import { CreditCard, MapPin, CheckCircle, ArrowRight, ArrowLeft, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { useCreateOrderMutation } from "../store/api/ordersApi";
import { useCreateCheckoutMutation } from "../store/api/paymentsApi";

const steps = [{ title: "Shipping" }, { title: "Payment" }, { title: "Done" }];

export default function Checkout() {
  const { items, total, clear } = useCart();
  const navigate = useNavigate();
  const toast = useToast();
  const { activeStep, setActiveStep } = useSteps({ index: 0, count: steps.length });
  const [createOrder] = useCreateOrderMutation();
  const [createCheckout] = useCreateCheckoutMutation();

  const border = useColorModeValue("volt.lightBorder", "volt.border");
  const cardBg = useColorModeValue("white", "volt.card");
  const secondary = useColorModeValue("gray.500", "volt.secondary");
  const muted = useColorModeValue("gray.400", "volt.muted");

  const [shipping, setShipping] = useState({ full_name: "", street: "", city: "", state: "", zip_code: "", country: "", phone: "" });

  if (items.length === 0 && activeStep < 2) return (
    <Container maxW="container.md" py={20} textAlign="center">
      <Heading size="md" mb={4} fontFamily="heading">Cart is empty</Heading>
      <Button variant="volt" onClick={() => navigate("/catalog")} fontSize="sm">Shop Now</Button>
    </Container>
  );

  const handlePlaceOrder = async () => {
    try {
      const order = await createOrder({ items: items.map((item) => ({ product_id: item.product.id, product_size_id: item.size_id, quantity: item.quantity })) }).unwrap();
      try {
        const checkout = await createCheckout({ order_id: order.id, success_url: `${window.location.origin}/order-success?order_id=${order.id}`, cancel_url: `${window.location.origin}/checkout` }).unwrap();
        clear(); window.location.href = checkout.checkout_url;
      } catch { clear(); setActiveStep(2); toast({ title: "Order placed!", status: "success", duration: 3000 }); }
    } catch { toast({ title: "Failed to place order", status: "error", duration: 3000 }); }
  };

  return (
    <Container maxW="container.xl" py={{ base: 6, md: 10 }}>
      <Text fontSize="2xs" fontWeight="700" letterSpacing="0.15em" textTransform="uppercase" color="volt.lime" mb={1} fontFamily="heading">Checkout</Text>
      <Heading size={{ base: "md", md: "lg" }} mb={8}>Complete your order</Heading>

      <Stepper index={activeStep} colorScheme="brand" mb={8} size="sm">
        {steps.map((step, i) => (
          <Step key={i}>
            <StepIndicator><StepStatus complete={<StepIcon />} incomplete={<StepNumber />} active={<StepNumber />} /></StepIndicator>
            <Box flexShrink={0}><StepTitle><Text fontSize="xs" fontWeight="600" fontFamily="heading">{step.title}</Text></StepTitle></Box>
            <StepSeparator />
          </Step>
        ))}
      </Stepper>

      <Grid templateColumns={{ base: "1fr", lg: "1fr 340px" }} gap={6}>
        <Box>
          {activeStep === 0 && (
            <Box bg={cardBg} p={{ base: 5, md: 7 }} borderRadius="2xl" border="1px solid" borderColor={border}>
              <Text fontWeight="700" fontSize="sm" mb={4} fontFamily="heading">Shipping Address</Text>
              <VStack spacing={3}>
                <FormControl>
                  <FormLabel fontSize="2xs" fontWeight="700" letterSpacing="0.06em" textTransform="uppercase" fontFamily="heading" color={secondary} mb={1}>Full Name</FormLabel>
                  <Input borderRadius="lg" h="44px" fontSize="sm" value={shipping.full_name} onChange={(e) => setShipping({ ...shipping, full_name: e.target.value })} />
                </FormControl>
                <FormControl>
                  <FormLabel fontSize="2xs" fontWeight="700" letterSpacing="0.06em" textTransform="uppercase" fontFamily="heading" color={secondary} mb={1}>Street</FormLabel>
                  <Input borderRadius="lg" h="44px" fontSize="sm" value={shipping.street} onChange={(e) => setShipping({ ...shipping, street: e.target.value })} />
                </FormControl>
                <Grid templateColumns="1fr 1fr" gap={3} w="full">
                  <FormControl><FormLabel fontSize="2xs" fontWeight="700" letterSpacing="0.06em" textTransform="uppercase" fontFamily="heading" color={secondary} mb={1}>City</FormLabel><Input borderRadius="lg" h="44px" fontSize="sm" value={shipping.city} onChange={(e) => setShipping({ ...shipping, city: e.target.value })} /></FormControl>
                  <FormControl><FormLabel fontSize="2xs" fontWeight="700" letterSpacing="0.06em" textTransform="uppercase" fontFamily="heading" color={secondary} mb={1}>State</FormLabel><Input borderRadius="lg" h="44px" fontSize="sm" value={shipping.state} onChange={(e) => setShipping({ ...shipping, state: e.target.value })} /></FormControl>
                </Grid>
                <Grid templateColumns="1fr 1fr" gap={3} w="full">
                  <FormControl><FormLabel fontSize="2xs" fontWeight="700" letterSpacing="0.06em" textTransform="uppercase" fontFamily="heading" color={secondary} mb={1}>ZIP</FormLabel><Input borderRadius="lg" h="44px" fontSize="sm" value={shipping.zip_code} onChange={(e) => setShipping({ ...shipping, zip_code: e.target.value })} /></FormControl>
                  <FormControl><FormLabel fontSize="2xs" fontWeight="700" letterSpacing="0.06em" textTransform="uppercase" fontFamily="heading" color={secondary} mb={1}>Country</FormLabel><Input borderRadius="lg" h="44px" fontSize="sm" value={shipping.country} onChange={(e) => setShipping({ ...shipping, country: e.target.value })} /></FormControl>
                </Grid>
                <Button variant="volt" size="lg" w="full" mt={2} onClick={() => setActiveStep(1)} borderRadius="lg" h="44px" rightIcon={<ArrowRight size={15} />} fontSize="sm">Continue</Button>
              </VStack>
            </Box>
          )}
          {activeStep === 1 && (
            <Box bg={cardBg} p={{ base: 5, md: 7 }} borderRadius="2xl" border="1px solid" borderColor={border}>
              <Text fontWeight="700" fontSize="sm" mb={4} fontFamily="heading">Payment</Text>
              <HStack bg="volt.limeGlow" border="1px solid" borderColor="volt.limeBorder" p={3} borderRadius="lg" spacing={2} mb={5}>
                <Shield size={14} color="#c8ff00" /><Text fontSize="xs" color="volt.lime" fontFamily="body">Secured with SSL encryption</Text>
              </HStack>
              <VStack spacing={3}>
                <Button variant="ghost" size="sm" onClick={() => setActiveStep(0)} leftIcon={<ArrowLeft size={13} />} fontSize="xs" alignSelf="flex-start">Back</Button>
                <Button variant="volt" size="lg" w="full" onClick={handlePlaceOrder} leftIcon={<CreditCard size={15} />} borderRadius="lg" h="44px" fontSize="sm">
                  Pay ${total.toFixed(2)}
                </Button>
              </VStack>
            </Box>
          )}
          {activeStep === 2 && (
            <Box bg={cardBg} p={{ base: 6, md: 10 }} borderRadius="2xl" border="1px solid" borderColor={border} textAlign="center">
              <Flex w={14} h={14} borderRadius="full" bg="green.500" color="white" align="center" justify="center" mx="auto" mb={4}><CheckCircle size={28} /></Flex>
              <Heading size="md" mb={2} fontFamily="heading">Order confirmed!</Heading>
              <Text color={secondary} mb={6} fontSize="sm" fontFamily="body">You'll receive a confirmation email.</Text>
              <HStack justify="center" spacing={3}>
                <Button variant="volt" onClick={() => navigate("/profile?tab=orders")} fontSize="sm">Orders</Button>
                <Button variant="secondary" onClick={() => navigate("/catalog")} fontSize="sm">Keep Shopping</Button>
              </HStack>
            </Box>
          )}
        </Box>

        {activeStep < 2 && (
          <Box bg={cardBg} p={4} borderRadius="2xl" border="1px solid" borderColor={border} h="fit-content" position="sticky" top="80px">
            <Text fontWeight="700" fontSize="2xs" mb={3} letterSpacing="0.1em" textTransform="uppercase" color={secondary} fontFamily="heading">Summary</Text>
            <VStack spacing={2} align="stretch" mb={3}>
              {items.map((item) => (
                <Flex key={`${item.product.id}-${item.size_id}`} gap={2} align="center">
                  <Image src={item.product.images?.[0]?.image_url || "https://via.placeholder.com/40"} w="40px" h="40px" borderRadius="lg" objectFit="cover" flexShrink={0} />
                  <Box flex={1} minW={0}>
                    <Text fontSize="xs" fontWeight="500" noOfLines={1} fontFamily="body">{item.product.name}</Text>
                    <Text fontSize="2xs" color={muted}>{item.size_name} &times; {item.quantity}</Text>
                  </Box>
                  <Text fontSize="xs" fontWeight="700" fontFamily="heading">${(item.product.price * item.quantity).toFixed(2)}</Text>
                </Flex>
              ))}
            </VStack>
            <Divider borderColor={border} mb={3} />
            <VStack spacing={1.5} fontSize="xs">
              <Flex w="full" justify="space-between"><Text color={secondary} fontFamily="body">Subtotal</Text><Text fontWeight="600" fontFamily="heading">${total.toFixed(2)}</Text></Flex>
              <Flex w="full" justify="space-between"><Text color={secondary} fontFamily="body">Shipping</Text><Text color="volt.lime" fontWeight="600" fontFamily="heading">Free</Text></Flex>
              <Divider borderColor={border} />
              <Flex w="full" justify="space-between" fontWeight="700" fontSize="md" fontFamily="heading" letterSpacing="-0.02em" pt={1}>
                <Text>Total</Text><Text>${total.toFixed(2)}</Text>
              </Flex>
            </VStack>
          </Box>
        )}
      </Grid>
    </Container>
  );
}
