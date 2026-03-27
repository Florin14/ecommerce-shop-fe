import {
  Box, Card, CardBody, Flex, IconButton, Image, Text, useColorModeValue, HStack,
} from "@chakra-ui/react";
import { Heart, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Product } from "../../types";

const MotionCard = motion(Card);

interface Props {
  product: Product;
}

export function ProductCard({ product }: Props) {
  const imageUrl = product.images?.[0]?.image_url || "https://via.placeholder.com/300x300?text=No+Image";
  const cardBg = useColorModeValue("white", "volt.card");
  const border = useColorModeValue("volt.lightBorder", "volt.border");
  const borderHover = useColorModeValue("volt.lightBorderHover", "volt.borderHover");
  const muted = useColorModeValue("gray.400", "volt.muted");

  return (
    <MotionCard
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      overflow="hidden" cursor="pointer" role="group"
      bg={cardBg} border="1px solid" borderColor={border} shadow="none"
      _hover={{ borderColor: borderHover }}
      borderRadius="2xl"
    >
      <Link to={`/product/${product.id}`}>
        <Box position="relative" overflow="hidden">
          <Image
            src={imageUrl} alt={product.name}
            h={{ base: "200px", md: "260px" }} w="full" objectFit="cover"
            transition="transform 0.5s cubic-bezier(0.4,0,0.2,1)"
            _groupHover={{ transform: "scale(1.04)" }}
          />

          {/* Hover actions */}
          <HStack
            position="absolute" bottom={3} left={3} right={3} justify="flex-end"
            spacing={1.5} opacity={0} transform="translateY(6px)"
            _groupHover={{ opacity: 1, transform: "translateY(0)" }}
            transition="all 0.25s cubic-bezier(0.4,0,0.2,1)"
          >
            <IconButton
              aria-label="Wishlist" icon={<Heart size={13} />} size="xs"
              borderRadius="full" bg="white" color="gray.700" shadow="md"
              _hover={{ color: "red.500" }}
              onClick={(e) => e.preventDefault()} w={7} h={7} minW={7}
            />
            <IconButton
              aria-label="Add to Cart" icon={<ShoppingBag size={13} />} size="xs"
              borderRadius="full" bg="volt.lime" color="volt.bg" shadow="md"
              _hover={{ opacity: 0.9 }}
              onClick={(e) => e.preventDefault()} w={7} h={7} minW={7}
            />
          </HStack>

          {/* Season badge */}
          {product.season && (
            <Box
              position="absolute" top={2.5} left={2.5}
              bg={useColorModeValue("white", "volt.elevated")} backdropFilter="blur(8px)"
              px={2} py={0.5} borderRadius="full" fontSize="2xs" fontWeight="700"
              letterSpacing="0.04em" textTransform="uppercase"
              border="1px solid" borderColor={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
              fontFamily="heading"
            >
              {product.season}
            </Box>
          )}
        </Box>
      </Link>

      <CardBody pt={3} pb={3.5} px={3.5}>
        <Text fontSize="2xs" color={muted} textTransform="uppercase" letterSpacing="0.12em" fontWeight="600" fontFamily="heading">
          {product.brand_name}
        </Text>
        <Link to={`/product/${product.id}`}>
          <Text fontWeight="500" mt={0.5} noOfLines={1} fontSize="sm" fontFamily="body" _hover={{ color: "volt.lime" }} transition="color 0.15s">
            {product.name}
          </Text>
        </Link>
        <Text fontWeight="700" fontSize="sm" mt={1} fontFamily="heading" letterSpacing="-0.02em">
          ${product.price.toFixed(2)}
        </Text>
      </CardBody>
    </MotionCard>
  );
}
