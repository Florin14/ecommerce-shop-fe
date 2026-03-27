import { useState } from "react";
import {
  Box, Button, Container, Flex, Heading, HStack, IconButton, Input, InputGroup, InputLeftElement,
  RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack,
  Select, SimpleGrid, Skeleton, Tag, TagCloseButton, TagLabel, Text,
  useColorModeValue, VStack, Wrap, WrapItem, Popover, PopoverTrigger, PopoverContent, PopoverBody,
} from "@chakra-ui/react";
import { Grid3X3, LayoutList, Search, ShoppingBag, SlidersHorizontal, Zap } from "lucide-react";
import { useGetProductsQuery, useGetProductResourcesQuery } from "../store/api/productsApi";
import { ProductCard } from "../components/product/ProductCard";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

export default function Catalog() {
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [search, setSearch] = useState("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [gridView, setGridView] = useState(true);

  const { data: products, isLoading } = useGetProductsQuery({ sort_by: sortBy, sort_order: sortOrder });
  const { data: resources } = useGetProductResourcesQuery();

  const filteredProducts = products?.filter((p) => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (selectedBrands.length > 0 && p.brand_name && !selectedBrands.includes(p.brand_name)) return false;
    if (selectedCategories.length > 0 && p.category_name && !selectedCategories.includes(p.category_name)) return false;
    if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
    return true;
  });

  const border = useColorModeValue("volt.lightBorder", "volt.border");
  const muted = useColorModeValue("gray.400", "volt.muted");
  const secondary = useColorModeValue("gray.500", "volt.secondary");
  const pillBg = useColorModeValue("blackAlpha.50", "whiteAlpha.50");
  const pillActiveBg = useColorModeValue("volt.bg", "volt.lime");
  const pillActiveColor = useColorModeValue("white", "volt.bg");
  const popBg = useColorModeValue("white", "volt.elevated");

  const toggleBrand = (name: string) => {
    setSelectedBrands((prev) => prev.includes(name) ? prev.filter((b) => b !== name) : [...prev, name]);
  };
  const toggleCategory = (name: string) => {
    setSelectedCategories((prev) => prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]);
  };
  const hasFilters = selectedBrands.length > 0 || selectedCategories.length > 0 || priceRange[0] > 0 || priceRange[1] < 500;

  return (
    <Container maxW="container.xl" py={{ base: 6, md: 10 }}>
      {/* Header */}
      <MotionBox initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <Box mb={6}>
          <Text fontSize="2xs" fontWeight="700" letterSpacing="0.15em" textTransform="uppercase" color="volt.lime" mb={1} fontFamily="heading">
            Collection
          </Text>
          <Heading size={{ base: "md", md: "lg" }} mb={1}>All Products</Heading>
          <Text color={secondary} fontSize="xs">{filteredProducts?.length || 0} products</Text>
        </Box>
      </MotionBox>

      {/* ── INLINE FILTERS ── No sidebar. Horizontal pills. Popovers for details. */}
      <VStack spacing={3} align="stretch" mb={6}>
        {/* Search + Sort row */}
        <HStack spacing={2} flexWrap="wrap">
          <InputGroup maxW="240px" size="sm">
            <InputLeftElement><Search size={13} opacity={0.3} /></InputLeftElement>
            <Input
              placeholder="Filter..." value={search} onChange={(e) => setSearch(e.target.value)}
              borderRadius="full" fontSize="xs" fontFamily="body"
            />
          </InputGroup>

          {/* Brand pills */}
          <Popover placement="bottom-start" closeOnBlur>
            {({ onClose: closeBrandPop }) => (<>
            <PopoverTrigger>
              <Button
                size="sm" borderRadius="full" fontSize="xs" fontFamily="heading" fontWeight="600"
                variant={selectedBrands.length > 0 ? "volt" : "secondary"} px={4} h={8}
              >
                Brand {selectedBrands.length > 0 && `(${selectedBrands.length})`}
              </Button>
            </PopoverTrigger>
            <PopoverContent bg={popBg} border="1px solid" borderColor={border} borderRadius="xl" shadow="elevated" w="auto" minW="200px">
              <PopoverBody p={3}>
                <Wrap spacing={1.5}>
                  {resources?.brands.map((b) => (
                    <WrapItem key={b.id}>
                      <Button
                        size="xs" borderRadius="full" fontSize="2xs" fontFamily="heading"
                        variant={selectedBrands.includes(b.name) ? "volt" : "secondary"}
                        onClick={() => { toggleBrand(b.name); closeBrandPop(); }} h={7}
                      >
                        {b.name}
                      </Button>
                    </WrapItem>
                  ))}
                </Wrap>
              </PopoverBody>
            </PopoverContent>
            </>)}
          </Popover>

          {/* Category pills */}
          <Popover placement="bottom-start" closeOnBlur>
            {({ onClose: closeCatPop }) => (<>
            <PopoverTrigger>
              <Button
                size="sm" borderRadius="full" fontSize="xs" fontFamily="heading" fontWeight="600"
                variant={selectedCategories.length > 0 ? "volt" : "secondary"} px={4} h={8}
              >
                Category {selectedCategories.length > 0 && `(${selectedCategories.length})`}
              </Button>
            </PopoverTrigger>
            <PopoverContent bg={popBg} border="1px solid" borderColor={border} borderRadius="xl" shadow="elevated" w="auto" minW="200px">
              <PopoverBody p={3}>
                <Wrap spacing={1.5}>
                  {resources?.categories.map((c) => (
                    <WrapItem key={c.id}>
                      <Button
                        size="xs" borderRadius="full" fontSize="2xs" fontFamily="heading"
                        variant={selectedCategories.includes(c.name) ? "volt" : "secondary"}
                        onClick={() => { toggleCategory(c.name); closeCatPop(); }} h={7}
                      >
                        {c.name}
                      </Button>
                    </WrapItem>
                  ))}
                </Wrap>
              </PopoverBody>
            </PopoverContent>
            </>)}
          </Popover>

          {/* Price range */}
          <Popover placement="bottom-start">
            <PopoverTrigger>
              <Button
                size="sm" borderRadius="full" fontSize="xs" fontFamily="heading" fontWeight="600"
                variant={(priceRange[0] > 0 || priceRange[1] < 500) ? "volt" : "secondary"} px={4} h={8}
              >
                Price {(priceRange[0] > 0 || priceRange[1] < 500) ? `$${priceRange[0]}-$${priceRange[1]}` : ""}
              </Button>
            </PopoverTrigger>
            <PopoverContent bg={popBg} border="1px solid" borderColor={border} borderRadius="xl" shadow="elevated" w="260px">
              <PopoverBody p={4}>
                <RangeSlider min={0} max={500} step={10} value={priceRange} onChange={(val) => setPriceRange(val as [number, number])}>
                  <RangeSliderTrack bg={useColorModeValue("gray.200", "whiteAlpha.100")} borderRadius="full" h="3px">
                    <RangeSliderFilledTrack bg="volt.lime" />
                  </RangeSliderTrack>
                  <RangeSliderThumb index={0} boxSize={3} shadow="md" />
                  <RangeSliderThumb index={1} boxSize={3} shadow="md" />
                </RangeSlider>
                <HStack justify="space-between" mt={2}>
                  <Text fontSize="2xs" color={muted} fontFamily="heading">${priceRange[0]}</Text>
                  <Text fontSize="2xs" color={muted} fontFamily="heading">${priceRange[1]}</Text>
                </HStack>
              </PopoverBody>
            </PopoverContent>
          </Popover>

          {/* Sort */}
          <Select
            maxW="140px" borderRadius="full" size="sm" fontSize="xs" fontFamily="heading"
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => { const [s, o] = e.target.value.split("-"); setSortBy(s); setSortOrder(o); }}
            border="1px solid" borderColor={border} bg="transparent" h={8}
          >
            <option value="name-asc">A-Z</option>
            <option value="name-desc">Z-A</option>
            <option value="price-asc">Price ↑</option>
            <option value="price-desc">Price ↓</option>
          </Select>

          <HStack ml="auto" spacing={1}>
            <IconButton aria-label="Grid" icon={<Grid3X3 size={13} />} variant={gridView ? "volt" : "ghost"} onClick={() => setGridView(true)} borderRadius="lg" size="xs" />
            <IconButton aria-label="List" icon={<LayoutList size={13} />} variant={!gridView ? "volt" : "ghost"} onClick={() => setGridView(false)} borderRadius="lg" size="xs" />
          </HStack>
        </HStack>

        {/* Active filter chips */}
        {hasFilters && (
          <HStack spacing={1.5} flexWrap="wrap">
            {selectedBrands.map((b) => (
              <Tag key={b} size="sm" borderRadius="full" bg="volt.limeGlow" color="volt.lime" border="1px solid" borderColor="volt.limeBorder" fontFamily="heading">
                <TagLabel fontSize="2xs" fontWeight="600">{b}</TagLabel>
                <TagCloseButton onClick={() => toggleBrand(b)} />
              </Tag>
            ))}
            {selectedCategories.map((c) => (
              <Tag key={c} size="sm" borderRadius="full" bg="volt.limeGlow" color="volt.lime" border="1px solid" borderColor="volt.limeBorder" fontFamily="heading">
                <TagLabel fontSize="2xs" fontWeight="600">{c}</TagLabel>
                <TagCloseButton onClick={() => toggleCategory(c)} />
              </Tag>
            ))}
            <Button size="xs" variant="ghost" fontSize="2xs" color={muted} onClick={() => { setSelectedBrands([]); setSelectedCategories([]); setPriceRange([0, 500]); }}>
              Clear all
            </Button>
          </HStack>
        )}
      </VStack>

      {/* ── PRODUCT GRID ── */}
      {isLoading ? (
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={3}>
          {Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} h="320px" borderRadius="2xl" />)}
        </SimpleGrid>
      ) : !products || products.length === 0 ? (
        /* No products at all from API */
        <Flex
          direction="column" align="center" justify="center"
          py={{ base: 16, md: 24 }}
          px={6}
          borderRadius="2xl"
          border="1px dashed"
          borderColor={border}
          bg={useColorModeValue("blackAlpha.50", "whiteAlpha.50")}
        >
          <Flex
            w={16} h={16} borderRadius="2xl" mb={5}
            bg={useColorModeValue("blackAlpha.50", "whiteAlpha.50")}
            align="center" justify="center"
          >
            <ShoppingBag size={28} opacity={0.2} />
          </Flex>
          <Text fontSize="md" fontFamily="heading" fontWeight="700" mb={1}>
            No products yet
          </Text>
          <Text fontSize="sm" color={secondary} fontFamily="body" textAlign="center" maxW="320px" mb={6}>
            It looks like the store is empty right now. Check back soon for new arrivals and exclusive drops.
          </Text>
          <Button variant="volt" size="sm" borderRadius="full" px={6} fontSize="xs" onClick={() => window.location.reload()}>
            Refresh
          </Button>
        </Flex>
      ) : filteredProducts && filteredProducts.length > 0 ? (
        <SimpleGrid columns={gridView ? { base: 2, md: 4 } : { base: 1 }} spacing={3}>
          {filteredProducts.map((product, i) => (
            <MotionBox key={product.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: i * 0.025 }}
            >
              <ProductCard product={product} />
            </MotionBox>
          ))}
        </SimpleGrid>
      ) : (
        /* Products exist but filters returned nothing */
        <Flex
          direction="column" align="center" justify="center"
          py={{ base: 16, md: 24 }}
          px={6}
          borderRadius="2xl"
          border="1px dashed"
          borderColor={border}
          bg={useColorModeValue("blackAlpha.50", "whiteAlpha.50")}
        >
          <Flex
            w={16} h={16} borderRadius="2xl" mb={5}
            bg={useColorModeValue("blackAlpha.50", "whiteAlpha.50")}
            align="center" justify="center"
          >
            <Search size={28} opacity={0.2} />
          </Flex>
          <Text fontSize="md" fontFamily="heading" fontWeight="700" mb={1}>
            No matches
          </Text>
          <Text fontSize="sm" color={secondary} fontFamily="body" textAlign="center" maxW="340px" mb={6}>
            No products match your current filters. Try adjusting them or use the AI assistant to find what you're looking for.
          </Text>
          <HStack spacing={2}>
            <Button
              variant="volt" size="sm" borderRadius="full" px={5} fontSize="xs"
              onClick={() => { setSelectedBrands([]); setSelectedCategories([]); setPriceRange([0, 500]); setSearch(""); }}
            >
              Clear filters
            </Button>
            <Button
              variant="secondary" size="sm" borderRadius="full" px={5} fontSize="xs"
              onClick={() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }))}
            >
              Ask AI
            </Button>
          </HStack>
        </Flex>
      )}
    </Container>
  );
}
