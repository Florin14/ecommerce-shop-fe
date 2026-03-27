import { useState } from "react";
import {
  Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Container, Flex, Grid, Heading,
  HStack, IconButton, Image, NumberDecrementStepper, NumberIncrementStepper, NumberInput,
  NumberInputField, NumberInputStepper, SimpleGrid, Skeleton, Tab, TabList, TabPanel, TabPanels,
  Tabs, Tag, Text, useColorModeValue, useToast, VStack, Badge,
} from "@chakra-ui/react";
import { ChevronRight, Heart, ShoppingCart, Truck, Shield, RefreshCw, Zap } from "lucide-react";
import { useParams, Link } from "react-router-dom";
import { useGetProductQuery, useGetProductsQuery } from "../store/api/productsApi";
import { useCart } from "../hooks/useCart";
import { ProductCard } from "../components/product/ProductCard";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading } = useGetProductQuery(Number(id));
  const { data: relatedProducts } = useGetProductsQuery({ limit: 4 });
  const { add } = useCart();
  const toast = useToast();

  const [selectedSize, setSelectedSize] = useState<{ id: number; name: string } | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const border = useColorModeValue("volt.lightBorder", "volt.border");
  const secondary = useColorModeValue("gray.500", "volt.secondary");
  const muted = useColorModeValue("gray.400", "volt.muted");

  if (isLoading) return (
    <Container maxW="container.xl" py={10}>
      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={12}>
        <Skeleton h="500px" borderRadius="2xl" />
        <VStack align="stretch" spacing={4}>
          <Skeleton h="20px" w="140px" borderRadius="lg" />
          <Skeleton h="32px" w="260px" borderRadius="lg" />
          <Skeleton h="20px" w="80px" borderRadius="lg" />
        </VStack>
      </Grid>
    </Container>
  );

  if (!product) return <Container maxW="container.xl" py={20} textAlign="center"><Text color={secondary}>Product not found</Text></Container>;

  const images = product.images?.length > 0 ? product.images.map((img) => img.image_url) : ["https://via.placeholder.com/600x600?text=No+Image"];

  const handleAddToCart = () => {
    if (!selectedSize) { toast({ title: "Please select a size", status: "warning", duration: 2000 }); return; }
    add(product, selectedSize.id, selectedSize.name, quantity);
    toast({ title: "Added to cart!", status: "success", duration: 2000 });
  };

  return (
    <Container maxW="container.xl" py={{ base: 6, md: 10 }}>
      <Breadcrumb spacing={2} separator={<ChevronRight size={10} />} mb={6} fontSize="xs" color={muted} fontFamily="heading">
        <BreadcrumbItem><BreadcrumbLink as={Link} to="/" _hover={{ color: "volt.lime" }}>Home</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbItem><BreadcrumbLink as={Link} to="/catalog" _hover={{ color: "volt.lime" }}>Products</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbItem isCurrentPage><BreadcrumbLink>{product.name}</BreadcrumbLink></BreadcrumbItem>
      </Breadcrumb>

      <Grid templateColumns={{ base: "1fr", md: "1.15fr 0.85fr" }} gap={{ base: 8, md: 14 }}>
        {/* Gallery */}
        <MotionBox initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
          <Box borderRadius="2xl" overflow="hidden" border="1px solid" borderColor={border} mb={3}>
            <Image src={images[selectedImage]} alt={product.name} w="full" h={{ base: "380px", md: "520px" }} objectFit="cover" />
          </Box>
          {images.length > 1 && (
            <HStack spacing={2}>
              {images.map((img, i) => (
                <Box key={i} borderRadius="xl" overflow="hidden" border="2px solid"
                  borderColor={selectedImage === i ? "volt.lime" : "transparent"}
                  opacity={selectedImage === i ? 1 : 0.5} cursor="pointer"
                  onClick={() => setSelectedImage(i)} transition="all 0.15s" _hover={{ opacity: 1 }} flexShrink={0}
                >
                  <Image src={img} alt="" w="60px" h="60px" objectFit="cover" />
                </Box>
              ))}
            </HStack>
          )}
        </MotionBox>

        {/* Info */}
        <MotionBox initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
          <VStack align="stretch" spacing={5}>
            <Box>
              <HStack mb={2} spacing={1.5}>
                <Tag size="sm" bg="volt.limeGlow" color="volt.lime" borderRadius="full" border="1px solid" borderColor="volt.limeBorder"
                  fontWeight="700" fontSize="2xs" letterSpacing="0.04em" fontFamily="heading">
                  {product.brand_name}
                </Tag>
                <Tag size="sm" bg={useColorModeValue("blackAlpha.50", "whiteAlpha.50")} borderRadius="full" border="1px solid" borderColor={border}
                  fontWeight="600" fontSize="2xs" fontFamily="heading">
                  {product.category_name}
                </Tag>
              </HStack>
              <Heading size="xl" lineHeight="1.05">{product.name}</Heading>
            </Box>

            <Text fontSize="2xl" fontWeight="700" fontFamily="heading" letterSpacing="-0.03em">
              ${product.price.toFixed(2)}
            </Text>

            <Text color={secondary} lineHeight="1.8" fontSize="sm" fontFamily="body">{product.description}</Text>

            {/* Sizes */}
            <Box>
              <Text fontWeight="700" mb={2} fontSize="xs" letterSpacing="0.08em" textTransform="uppercase" color={secondary} fontFamily="heading">
                Size
              </Text>
              <Flex flexWrap="wrap" gap={1.5}>
                {product.size_stocks?.map((ss) => (
                  <Button
                    key={ss.id} size="sm" fontFamily="heading"
                    variant={selectedSize?.id === ss.product_size_id ? "volt" : "secondary"}
                    borderRadius="lg" minW="50px" h="38px" fontSize="sm" fontWeight="600"
                    onClick={() => setSelectedSize({ id: ss.product_size_id, name: ss.size_name || "" })}
                    isDisabled={ss.stock_quantity === 0} position="relative"
                  >
                    {ss.size_name}
                    {ss.stock_quantity <= 3 && ss.stock_quantity > 0 && (
                      <Badge position="absolute" top={-1} right={-1} bg="red.500" color="white" fontSize="2xs" borderRadius="full" px={1}>
                        {ss.stock_quantity}
                      </Badge>
                    )}
                  </Button>
                ))}
              </Flex>
            </Box>

            {/* Add to Cart */}
            <HStack spacing={2}>
              <NumberInput min={1} max={10} value={quantity} onChange={(_, val) => setQuantity(val)} maxW="76px">
                <NumberInputField borderRadius="lg" fontWeight="600" fontFamily="heading" border="1px solid" borderColor={border} h="44px" fontSize="sm" />
                <NumberInputStepper><NumberIncrementStepper /><NumberDecrementStepper /></NumberInputStepper>
              </NumberInput>
              <Button flex={1} variant="volt" size="lg" leftIcon={<ShoppingCart size={16} />} onClick={handleAddToCart}
                borderRadius="lg" h="44px" fontSize="sm">
                Add to Cart
              </Button>
              <IconButton aria-label="Wishlist" icon={<Heart size={18} />} variant="secondary" borderRadius="lg" h="44px" w="44px" />
            </HStack>

            {/* Trust */}
            <SimpleGrid columns={3} gap={2}>
              {[
                { icon: Truck, label: "Free Shipping", sub: "$100+" },
                { icon: Shield, label: "Secure", sub: "SSL" },
                { icon: RefreshCw, label: "Returns", sub: "30 days" },
              ].map((b) => (
                <VStack key={b.label} bg={useColorModeValue("blackAlpha.50", "whiteAlpha.50")} borderRadius="xl" p={2.5} spacing={0.5} border="1px solid" borderColor={border}>
                  <b.icon size={13} color="var(--chakra-colors-volt-lime)" />
                  <Text fontSize="2xs" fontWeight="700" fontFamily="heading">{b.label}</Text>
                  <Text fontSize="2xs" color={muted}>{b.sub}</Text>
                </VStack>
              ))}
            </SimpleGrid>

            {/* Tabs */}
            <Tabs variant="soft-rounded" size="sm" mt={1}>
              <TabList>
                <Tab borderRadius="full" fontWeight="600" fontSize="xs" fontFamily="heading" _selected={{ bg: "volt.lime", color: "volt.bg" }}>Details</Tab>
                <Tab borderRadius="full" fontWeight="600" fontSize="xs" fontFamily="heading" _selected={{ bg: "volt.lime", color: "volt.bg" }}>Specs</Tab>
              </TabList>
              <TabPanels>
                <TabPanel px={0} pt={3}>
                  <VStack align="stretch" spacing={0}>
                    {[["SKU", product.sku || "N/A"], ["Material", product.material || "N/A"], ["Season", product.season || "N/A"], ["Origin", product.country_of_origin || "N/A"]].map(([l, v]) => (
                      <HStack key={l} justify="space-between" py={2} borderBottom="1px solid" borderColor={border}>
                        <Text fontSize="xs" color={secondary} fontFamily="body">{l}</Text>
                        <Text fontWeight="600" fontSize="xs" fontFamily="heading">{v}</Text>
                      </HStack>
                    ))}
                  </VStack>
                </TabPanel>
                <TabPanel px={0} pt={3}>
                  <VStack align="stretch" spacing={0}>
                    {[["Brand", product.brand_name], ["Category", product.category_name], ["Gender", product.gender_name], ["Age", product.age_group || "All"]].map(([l, v]) => (
                      <HStack key={l} justify="space-between" py={2} borderBottom="1px solid" borderColor={border}>
                        <Text fontSize="xs" color={secondary} fontFamily="body">{l}</Text>
                        <Text fontWeight="600" fontSize="xs" fontFamily="heading">{v}</Text>
                      </HStack>
                    ))}
                  </VStack>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </VStack>
        </MotionBox>
      </Grid>

      {/* Related */}
      <Box mt={{ base: 14, md: 20 }}>
        <Text fontSize="2xs" fontWeight="700" letterSpacing="0.15em" textTransform="uppercase" color="volt.lime" mb={1} fontFamily="heading">
          Complete the look
        </Text>
        <Heading size="md" mb={6}>You might also like</Heading>
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={3}>
          {relatedProducts?.filter((p) => p.id !== product.id).slice(0, 4).map((p) => <ProductCard key={p.id} product={p} />)}
        </SimpleGrid>
      </Box>
    </Container>
  );
}
