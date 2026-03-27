import {
  Box, Button, Container, Grid, Heading, HStack, Image, SimpleGrid, Text,
  VStack, useColorModeValue, Flex, GridItem,
} from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, Zap, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../store/api/productsApi";
import { ProductCard } from "../components/product/ProductCard";
import { useOS } from "../hooks/useOS";
import { useRef } from "react";

const MotionBox = motion(Box);

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.06); }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const marquee = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const categories = [
  { name: "Sneakers", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600" },
  { name: "Running", image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600" },
  { name: "Casual", image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600" },
  { name: "Basketball", image: "https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=600" },
];

const brands = ["NIKE", "ADIDAS", "PUMA", "NEW BALANCE", "REEBOK", "CONVERSE", "VANS", "JORDAN"];

export default function Home() {
  const { data: products } = useGetProductsQuery({ limit: 8 });
  const os = useOS();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const border = useColorModeValue("volt.lightBorder", "volt.border");
  const muted = useColorModeValue("gray.400", "volt.muted");
  const secondary = useColorModeValue("gray.500", "volt.secondary");
  const cardBg = useColorModeValue("white", "volt.card");

  const openCmd = () => {
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: os.isMac, ctrlKey: !os.isMac }));
  };

  return (
    <Box>
      {/* ── HERO ── */}
      <Box ref={heroRef} position="relative" minH={{ base: "90vh", md: "100vh" }} display="flex" alignItems="center">
        {/* Gradient background */}
        <Box
          position="absolute" inset={0}
          bgGradient={useColorModeValue(
            "linear(to-br, #f0fdd4, #e8fcc8, #f5f5f4, #ecfdf5, #f0fdd4)",
            "linear(to-br, #09090b, #0d1a00, #09090b, #001a0d, #09090b)"
          )}
          backgroundSize="200% 200%"
          animation={`${gradientShift} 12s ease-in-out infinite`}
        />
        {/* Animated floating gradient orbs */}
        <Box
          position="absolute" top="-15%" right="-8%"
          w={{ base: "350px", md: "700px" }} h={{ base: "350px", md: "700px" }}
          borderRadius="full"
          bgGradient="linear(to-br, volt.lime, #00ff88)"
          filter={{ base: "blur(120px)", md: "blur(180px)" }}
          opacity={useColorModeValue(0.15, 0.07)}
          pointerEvents="none"
          animation={`${pulse} 8s ease-in-out infinite`}
        />
        <Box
          position="absolute" bottom="-15%" left="-8%"
          w={{ base: "250px", md: "550px" }} h={{ base: "250px", md: "550px" }}
          borderRadius="full"
          bgGradient="linear(to-tr, #00cc66, volt.lime)"
          filter={{ base: "blur(100px)", md: "blur(160px)" }}
          opacity={useColorModeValue(0.1, 0.05)}
          pointerEvents="none"
          animation={`${pulse} 11s ease-in-out infinite reverse`}
        />
        <Box
          position="absolute" top="40%" left="30%"
          w={{ base: "200px", md: "400px" }} h={{ base: "200px", md: "400px" }}
          borderRadius="full"
          bg="volt.lime"
          filter="blur(200px)"
          opacity={useColorModeValue(0.06, 0.03)}
          pointerEvents="none"
          animation={`${pulse} 14s ease-in-out infinite`}
        />
        {/* Dot grid pattern */}
        <Box
          position="absolute" inset={0} opacity={useColorModeValue(0.03, 0.04)}
          bgImage="radial-gradient(circle, currentColor 1px, transparent 1px)"
          bgSize="32px 32px" pointerEvents="none"
        />

        <Container maxW="container.xl" position="relative" zIndex={1}>
          <MotionBox style={{ y: heroY, opacity: heroOpacity }}>
            <Grid templateColumns={{ base: "1fr", lg: "1.2fr 0.8fr" }} gap={{ base: 10, lg: 16 }} alignItems="center">
              <VStack align="flex-start" spacing={6}>
                {/* Tagline */}
                <MotionBox initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
                  <HStack spacing={2}>
                    <Box w={1.5} h={1.5} borderRadius="full" bg="volt.lime" shadow="0 0 8px rgba(200,255,0,0.5)" />
                    <Text fontSize="xs" fontWeight="600" color={secondary} fontFamily="heading" letterSpacing="0.02em">
                      New drops weekly
                    </Text>
                  </HStack>
                </MotionBox>

                {/* Giant heading */}
                <MotionBox initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                  <Heading
                    fontSize={{ base: "5xl", md: "6xl", lg: "8xl" }}
                    lineHeight="0.9" fontWeight="700"
                  >
                    Move
                    <br />
                    different
                    <Text as="span" color="volt.lime">.</Text>
                  </Heading>
                </MotionBox>

                {/* Subtitle */}
                <MotionBox initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35 }}>
                  <Text fontSize="sm" color={secondary} maxW="400px" lineHeight="1.8" fontFamily="body">
                    Curated footwear from the world's best brands. AI-powered search finds exactly what you want — just describe it.
                  </Text>
                </MotionBox>

                {/* CTAs */}
                <MotionBox initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.45 }}>
                  <HStack spacing={3}>
                    <Link to="/catalog">
                      <Button variant="volt" size="lg" px={8} h={12} fontSize="sm" rightIcon={<ArrowRight size={16} />}>
                        Shop Now
                      </Button>
                    </Link>
                    <Button variant="secondary" size="lg" px={6} h={12} fontSize="sm" onClick={openCmd}>
                      Ask AI
                      <Box ml={2} bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")} borderRadius="md" px={1.5} py={0.5}>
                        <Text fontSize="2xs" fontFamily="heading" fontWeight="600">{os.mod}K</Text>
                      </Box>
                    </Button>
                  </HStack>
                </MotionBox>

                {/* Social proof */}
                <MotionBox initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.6 }}>
                  <HStack spacing={4} mt={2}>
                    <HStack spacing={0.5}>
                      {[1,2,3,4,5].map((i) => <Star key={i} size={11} fill="#c8ff00" color="#c8ff00" />)}
                    </HStack>
                    <Text fontSize="xs" color={muted}>
                      Trusted by <strong>50k+</strong> customers
                    </Text>
                  </HStack>
                </MotionBox>
              </VStack>

              {/* Hero image grid */}
              <MotionBox
                initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }} display={{ base: "none", lg: "block" }}
              >
                <Grid templateColumns="1fr 1fr" templateRows="1fr 0.5fr" gap={3} h="500px">
                  <GridItem rowSpan={2}>
                    <Box borderRadius="2xl" overflow="hidden" h="full" border="1px solid" borderColor={border}>
                      <Image src="https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600" alt="Hero" w="full" h="full" objectFit="cover" />
                    </Box>
                  </GridItem>
                  <GridItem>
                    <Flex
                      borderRadius="2xl" h="full" p={5} direction="column" justify="space-between"
                      bg="volt.lime" color="volt.bg"
                    >
                      <Zap size={18} />
                      <Box>
                        <Text fontSize="2xl" fontWeight="700" fontFamily="heading" letterSpacing="-0.04em" lineHeight="1">30%</Text>
                        <Text fontSize="xs" opacity={0.7} fontFamily="body">off this week</Text>
                      </Box>
                    </Flex>
                  </GridItem>
                  <GridItem>
                    <Box borderRadius="2xl" overflow="hidden" h="full" border="1px solid" borderColor={border}>
                      <Image src="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400" alt="Featured" w="full" h="full" objectFit="cover" />
                    </Box>
                  </GridItem>
                </Grid>
              </MotionBox>
            </Grid>
          </MotionBox>
        </Container>
      </Box>

      {/* ── BRAND MARQUEE ── */}
      <Box py={4} overflow="hidden" borderY="1px solid" borderColor={border}>
        <Box display="flex" animation={`${marquee} 30s linear infinite`} w="fit-content">
          {[...brands, ...brands].map((name, i) => (
            <Text key={i} fontSize="sm" fontWeight="700" letterSpacing="0.25em" color={muted}
              mx={8} whiteSpace="nowrap" userSelect="none" fontFamily="heading"
            >
              {name}
            </Text>
          ))}
        </Box>
      </Box>

      {/* ── CATEGORIES ── */}
      <Container maxW="container.xl" py={{ base: 12, md: 20 }}>
        <Flex justify="space-between" align="end" mb={8}>
          <Box>
            <Text fontSize="2xs" fontWeight="700" letterSpacing="0.15em" textTransform="uppercase" color="volt.lime" mb={1} fontFamily="heading">
              Categories
            </Text>
            <Heading size={{ base: "md", md: "lg" }}>Shop by style</Heading>
          </Box>
          <Link to="/catalog">
            <Button variant="ghost" size="sm" rightIcon={<ArrowUpRight size={13} />} fontSize="xs" color={secondary}>
              View all
            </Button>
          </Link>
        </Flex>

        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={3}>
          {categories.map((cat, i) => (
            <MotionBox
              key={cat.name} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <Link to={`/catalog?category=${cat.name}`}>
                <Box
                  position="relative" borderRadius="2xl" overflow="hidden" cursor="pointer"
                  role="group" h={{ base: "180px", md: "240px" }} border="1px solid" borderColor={border}
                >
                  <Image
                    src={cat.image} alt={cat.name} w="full" h="full" objectFit="cover"
                    transition="transform 0.5s cubic-bezier(0.4,0,0.2,1)" _groupHover={{ transform: "scale(1.05)" }}
                  />
                  <Box position="absolute" inset={0} bgGradient="linear(to-t, blackAlpha.700 0%, transparent 50%)" display="flex" alignItems="flex-end" p={4}>
                    <HStack justify="space-between" w="full">
                      <Text color="white" fontWeight="700" fontSize="sm" fontFamily="heading" letterSpacing="-0.02em">{cat.name}</Text>
                      <Flex
                        w={6} h={6} borderRadius="full" bg="whiteAlpha.200" backdropFilter="blur(4px)"
                        align="center" justify="center" color="white"
                        transition="all 0.2s" _groupHover={{ bg: "volt.lime", color: "volt.bg" }}
                      >
                        <ArrowUpRight size={12} />
                      </Flex>
                    </HStack>
                  </Box>
                </Box>
              </Link>
            </MotionBox>
          ))}
        </SimpleGrid>
      </Container>

      {/* ── TRENDING PRODUCTS ── */}
      <Box borderY="1px solid" borderColor={border} py={{ base: 12, md: 20 }}>
        <Container maxW="container.xl">
          <Flex justify="space-between" align="end" mb={10}>
            <Box>
              <Text fontSize="2xs" fontWeight="700" letterSpacing="0.15em" textTransform="uppercase" color="volt.lime" mb={1} fontFamily="heading">
                Trending
              </Text>
              <Heading size={{ base: "md", md: "lg" }}>This week's picks</Heading>
            </Box>
            <Link to="/catalog">
              <Button variant="ghost" size="sm" rightIcon={<ArrowUpRight size={13} />} fontSize="xs" color={secondary}>
                View all
              </Button>
            </Link>
          </Flex>

          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={3}>
            {products?.slice(0, 8).map((product, i) => (
              <MotionBox key={product.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.04 }}
              >
                <ProductCard product={product} />
              </MotionBox>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* ── CTA ── */}
      <Container maxW="container.xl" py={{ base: 12, md: 20 }}>
        <MotionBox initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Flex
            borderRadius="2xl" border="1px solid" borderColor={border}
            bgGradient={useColorModeValue(
              "linear(to-br, #09090b, #0d1a00, #09090b)",
              "linear(to-br, volt.card, #0d1a00, volt.card)"
            )}
            color="white"
            py={{ base: 14, md: 20 }} px={{ base: 6, md: 14 }}
            direction="column" align="center" textAlign="center" position="relative" overflow="hidden"
          >
            {/* Gradient glow */}
            <Box position="absolute" top="-50%" w="500px" h="500px" borderRadius="full" bgGradient="linear(to-br, volt.lime, #00ff88)" filter="blur(150px)" opacity={0.08} />
            <Box position="absolute" bottom="-40%" right="-10%" w="300px" h="300px" borderRadius="full" bgGradient="linear(to-tr, #00cc66, volt.lime)" filter="blur(120px)" opacity={0.05} />

            <Text fontSize="2xs" fontWeight="700" letterSpacing="0.15em" textTransform="uppercase" color="volt.lime" mb={3} fontFamily="heading">
              Join GRIFO
            </Text>
            <Heading size={{ base: "lg", md: "xl" }} mb={4} maxW="500px">
              Get early access to exclusive drops
            </Heading>
            <Text fontSize="sm" color="whiteAlpha.500" mb={8} maxW="360px" fontFamily="body">
              Member-only pricing, first access to limited releases, and AI-curated picks.
            </Text>
            <Link to="/register">
              <Button variant="volt" size="lg" px={8} h={12} fontSize="sm">
                Get Started Free
              </Button>
            </Link>
          </Flex>
        </MotionBox>
      </Container>
    </Box>
  );
}
