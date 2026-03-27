import { Box, Container, Grid, GridItem, HStack, Input, Link, Text, VStack, useColorModeValue, Flex, IconButton } from "@chakra-ui/react";
import { ArrowRight, Github, Twitter, Instagram } from "lucide-react";

export function Footer() {
  const muted = useColorModeValue("gray.500", "volt.muted");
  const link = useColorModeValue("gray.500", "gray.500");

  return (
    <Box bg={useColorModeValue("volt.bg", "volt.bg")} color="gray.400" mt="auto" borderTop="1px solid" borderColor="volt.border">
      <Container maxW="container.xl" pt={{ base: 10, md: 14 }} pb={6}>
        <Grid templateColumns={{ base: "1fr", md: "1.5fr 1fr 1fr 1.5fr" }} gap={{ base: 8, md: 10 }}>
          <GridItem>
            <Text fontFamily="heading" fontWeight="700" fontSize="md" letterSpacing="-0.04em" color="white" mb={3}>
              GRIFO<Text as="span" color="volt.lime">.</Text>
            </Text>
            <Text fontSize="xs" lineHeight="1.8" color={muted} maxW="240px" fontFamily="body">
              The future of shopping. AI-powered, curated, fast.
            </Text>
            <HStack spacing={1} mt={3}>
              {[Twitter, Instagram, Github].map((Icon, i) => (
                <IconButton key={i} aria-label="Social" icon={<Icon size={13} />} variant="ghost" size="sm" borderRadius="lg" color={muted} _hover={{ color: "white" }} minW={7} h={7} />
              ))}
            </HStack>
          </GridItem>
          <GridItem>
            <Text fontSize="2xs" fontWeight="700" color="gray.600" mb={3} letterSpacing="0.12em" textTransform="uppercase" fontFamily="heading">Shop</Text>
            <VStack align="start" spacing={2}>
              {["All Products", "Sneakers", "Running", "Casual"].map((item) => (
                <Link key={item} href={`/catalog${item === "All Products" ? "" : `?category=${item}`}`} fontSize="xs" color={link} _hover={{ color: "white" }} transition="color 0.15s" fontFamily="body">{item}</Link>
              ))}
            </VStack>
          </GridItem>
          <GridItem>
            <Text fontSize="2xs" fontWeight="700" color="gray.600" mb={3} letterSpacing="0.12em" textTransform="uppercase" fontFamily="heading">Support</Text>
            <VStack align="start" spacing={2}>
              {["Help Center", "Shipping", "Returns", "Contact"].map((item) => (
                <Link key={item} fontSize="xs" color={link} _hover={{ color: "white" }} transition="color 0.15s" fontFamily="body">{item}</Link>
              ))}
            </VStack>
          </GridItem>
          <GridItem>
            <Text fontSize="2xs" fontWeight="700" color="gray.600" mb={3} letterSpacing="0.12em" textTransform="uppercase" fontFamily="heading">Newsletter</Text>
            <Text fontSize="xs" mb={2} color={muted} fontFamily="body">Get the latest drops.</Text>
            <HStack>
              <Input placeholder="your@email.com" size="sm" borderRadius="lg" bg="whiteAlpha.50" border="1px solid" borderColor="whiteAlpha.100" _focus={{ borderColor: "volt.lime" }} _placeholder={{ color: "gray.700" }} h="34px" fontSize="xs" />
              <IconButton aria-label="Subscribe" icon={<ArrowRight size={13} />} bg="volt.lime" color="volt.bg" borderRadius="lg" size="sm" h="34px" w="34px" minW="34px" _hover={{ opacity: 0.9 }} />
            </HStack>
          </GridItem>
        </Grid>
        <Flex borderTop="1px solid" borderColor="whiteAlpha.50" mt={10} pt={5} justify="space-between" align="center" flexWrap="wrap" gap={3}>
          <Text fontSize="2xs" color="gray.700" fontFamily="body">&copy; 2026 GRIFO. All rights reserved.</Text>
          <HStack spacing={5} fontSize="2xs" color="gray.700" fontFamily="body">
            <Link _hover={{ color: "gray.500" }}>Privacy</Link>
            <Link _hover={{ color: "gray.500" }}>Terms</Link>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}
