import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, HStack, IconButton, Image, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/useCart";

interface Props { isOpen: boolean; onClose: () => void; }

export function CartDrawer({ isOpen, onClose }: Props) {
  const { items, remove, update, total, itemCount } = useCart();
  const navigate = useNavigate();
  const border = useColorModeValue("volt.lightBorder", "volt.border");
  const muted = useColorModeValue("gray.400", "volt.muted");
  const secondary = useColorModeValue("gray.500", "volt.secondary");
  const itemBg = useColorModeValue("blackAlpha.50", "whiteAlpha.50");

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
      <DrawerOverlay />
      <DrawerContent borderLeftRadius="2xl">
        <DrawerCloseButton borderRadius="lg" top={4} right={4} />
        <DrawerHeader borderBottomWidth="1px" borderColor={border} py={4}>
          <HStack spacing={2.5}>
            <Flex w={6} h={6} borderRadius="md" bg="volt.lime" color="volt.bg" align="center" justify="center">
              <ShoppingBag size={13} />
            </Flex>
            <Box>
              <Text fontSize="sm" fontWeight="700" fontFamily="heading" letterSpacing="-0.02em">Cart</Text>
              <Text fontSize="2xs" color={muted}>{itemCount} items</Text>
            </Box>
          </HStack>
        </DrawerHeader>

        <DrawerBody py={3} px={3}>
          {items.length === 0 ? (
            <VStack py={16} spacing={4} color={muted}>
              <ShoppingBag size={28} opacity={0.2} />
              <Text fontWeight="600" fontSize="sm" fontFamily="heading">Empty cart</Text>
              <Button variant="volt" size="sm" borderRadius="full" px={5} fontSize="xs" onClick={() => { onClose(); navigate("/catalog"); }}>
                Shop Now
              </Button>
            </VStack>
          ) : (
            <VStack spacing={2} align="stretch">
              {items.map((item) => (
                <Flex key={`${item.product.id}-${item.size_id}`} bg={itemBg} p={2.5} borderRadius="xl" gap={2.5} border="1px solid" borderColor={border}>
                  <Image src={item.product.images?.[0]?.image_url || "https://via.placeholder.com/60"} alt={item.product.name} w="56px" h="56px" objectFit="cover" borderRadius="lg" flexShrink={0} />
                  <Box flex={1} minW={0}>
                    <Text fontWeight="600" fontSize="xs" noOfLines={1} fontFamily="body">{item.product.name}</Text>
                    <Text fontSize="2xs" color={muted}>Size: {item.size_name}</Text>
                    <Text fontWeight="700" fontSize="xs" mt={0.5} fontFamily="heading">${item.product.price.toFixed(2)}</Text>
                    <HStack mt={1.5} spacing={1}>
                      <HStack bg={useColorModeValue("white", "whiteAlpha.100")} borderRadius="md" border="1px solid" borderColor={border} spacing={0} overflow="hidden">
                        <IconButton aria-label="-" icon={<Minus size={10} />} size="xs" variant="ghost" borderRadius="none" onClick={() => update(item.product.id, item.size_id, item.quantity - 1)} isDisabled={item.quantity <= 1} minW={5} h={5} />
                        <Text fontSize="2xs" fontWeight="700" minW="20px" textAlign="center" fontFamily="heading">{item.quantity}</Text>
                        <IconButton aria-label="+" icon={<Plus size={10} />} size="xs" variant="ghost" borderRadius="none" onClick={() => update(item.product.id, item.size_id, item.quantity + 1)} minW={5} h={5} />
                      </HStack>
                      <IconButton aria-label="Remove" icon={<Trash2 size={11} />} size="xs" variant="ghost" color={muted} _hover={{ color: "red.400" }} ml="auto" borderRadius="md" onClick={() => remove(item.product.id, item.size_id)} />
                    </HStack>
                  </Box>
                </Flex>
              ))}
            </VStack>
          )}
        </DrawerBody>

        {items.length > 0 && (
          <DrawerFooter borderTopWidth="1px" borderColor={border} flexDirection="column" gap={3} px={3} py={4}>
            <Flex w="full" justify="space-between" align="center">
              <Text fontSize="xs" color={secondary} fontFamily="body">Subtotal</Text>
              <Text fontWeight="700" fontSize="lg" fontFamily="heading" letterSpacing="-0.03em">${total.toFixed(2)}</Text>
            </Flex>
            <Button w="full" variant="volt" size="lg" borderRadius="lg" h="44px" rightIcon={<ArrowRight size={15} />} fontSize="sm"
              onClick={() => { onClose(); navigate("/checkout"); }}>
              Checkout
            </Button>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
}
