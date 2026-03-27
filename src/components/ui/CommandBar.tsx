import { useState, useEffect, useRef, useCallback } from "react";
import {
  Box,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  VStack,
  useColorModeValue,
  Image,
  Spinner,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Home,
  ShoppingBag,
  User,
  Heart,
  Package,
  Settings,
  Moon,
  Sun,
  ArrowRight,
  LayoutDashboard,
  Zap,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useColorMode } from "@chakra-ui/react";
import { useAutocompleteProductsQuery, useGetProductsQuery } from "../../store/api/productsApi";
import { useOS } from "../../hooks/useOS";
import { Product } from "../../types";

const MotionBox = motion(Box);

interface CommandItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: () => void;
  category: "product" | "navigation" | "action" | "ai";
  subtitle?: string;
  image?: string;
}

// Lightweight product matching for AI-style queries
function aiMatch(query: string, products: Product[]): Product[] {
  const q = query.toLowerCase();
  const words = q.split(/\s+/).filter((w) => w.length > 2);
  return products
    .filter((p) => {
      const h = `${p.name} ${p.brand_name} ${p.category_name} ${p.description} ${p.season} ${p.material}`.toLowerCase();
      return words.some((w) => h.includes(w));
    })
    .slice(0, 5);
}

function isAIQuery(q: string): boolean {
  const triggers = ["find", "show", "recommend", "suggest", "want", "looking", "need", "best", "cheap", "under", "outfit", "like", "match", "similar"];
  return triggers.some((t) => q.toLowerCase().includes(t));
}

export function CommandBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  const os = useOS();

  const { data: autocomplete } = useAutocompleteProductsQuery(query, { skip: query.length < 2 });
  const { data: allProducts } = useGetProductsQuery({ limit: 50 });

  const bg = useColorModeValue("white", "#141416");
  const border = useColorModeValue("rgba(0,0,0,0.08)", "rgba(255,255,255,0.06)");
  const hoverBg = useColorModeValue("blackAlpha.50", "whiteAlpha.50");
  const selectedBg = useColorModeValue("volt.lightElevated", "volt.hover");
  const muted = useColorModeValue("gray.500", "volt.secondary");

  const close = useCallback(() => {
    setIsOpen(false);
    setQuery("");
    setSelectedIndex(0);
    setAiResponse(null);
  }, []);

  const nav = useCallback((path: string) => { navigate(path); close(); }, [navigate, close]);

  // Keyboard shortcut — OS aware
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const modPressed = os.isMac ? e.metaKey : e.ctrlKey;
      if (modPressed && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [close, os.isMac]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 50);
  }, [isOpen]);

  // AI response generation
  useEffect(() => {
    if (!query || !isAIQuery(query)) { setAiResponse(null); return; }
    const timer = setTimeout(() => {
      const q = query.toLowerCase();
      if (q.includes("cheap") || q.includes("under") || q.includes("budget"))
        setAiResponse("Showing affordable options sorted by price");
      else if (q.includes("outfit") || q.includes("match") || q.includes("look"))
        setAiResponse("Here are items that pair well together");
      else if (q.includes("best") || q.includes("popular") || q.includes("trending"))
        setAiResponse("Top picks based on customer favorites");
      else
        setAiResponse("Here's what I found for you");
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  // Build items
  const aiProducts = query.length >= 3 && isAIQuery(query) && allProducts
    ? aiMatch(query, allProducts) : [];

  const searchProducts = (autocomplete || []).slice(0, 5);

  const productItems: CommandItem[] = (aiProducts.length > 0 ? aiProducts : searchProducts).map((p) => ({
    id: `p-${p.id}`,
    label: p.name,
    subtitle: `${p.brand_name} · $${p.price.toFixed(0)}`,
    icon: null,
    image: p.images?.[0]?.image_url,
    action: () => nav(`/product/${p.id}`),
    category: aiProducts.length > 0 ? "ai" as const : "product" as const,
  }));

  const navItems: CommandItem[] = query.length === 0 ? [
    { id: "home", label: "Home", icon: <Home size={15} />, action: () => nav("/"), category: "navigation" as const },
    { id: "catalog", label: "All Products", icon: <ShoppingBag size={15} />, action: () => nav("/catalog"), category: "navigation" as const },
    { id: "profile", label: "Profile", icon: <User size={15} />, action: () => nav("/profile"), category: "navigation" as const },
    { id: "orders", label: "Orders", icon: <Package size={15} />, action: () => nav("/profile?tab=orders"), category: "navigation" as const },
    { id: "wishlist", label: "Wishlist", icon: <Heart size={15} />, action: () => nav("/profile?tab=wishlist"), category: "navigation" as const },
  ] : [
    { id: "home", label: "Home", icon: <Home size={15} />, action: () => nav("/"), category: "navigation" as const },
    { id: "catalog", label: "All Products", icon: <ShoppingBag size={15} />, action: () => nav("/catalog"), category: "navigation" as const },
  ].filter((item) => item.label.toLowerCase().includes(query.toLowerCase()));

  const actionItems: CommandItem[] = [
    {
      id: "theme",
      label: `${colorMode === "dark" ? "Light" : "Dark"} mode`,
      icon: colorMode === "dark" ? <Sun size={15} /> : <Moon size={15} />,
      action: () => { toggleColorMode(); close(); },
      category: "action" as const,
    },
  ];

  const allItems = [...productItems, ...navItems, ...actionItems];

  useEffect(() => { setSelectedIndex(0); }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setSelectedIndex((i) => Math.min(i + 1, allItems.length - 1)); }
    if (e.key === "ArrowUp") { e.preventDefault(); setSelectedIndex((i) => Math.max(i - 1, 0)); }
    if (e.key === "Enter" && allItems[selectedIndex]) allItems[selectedIndex].action();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <MotionBox
            position="fixed" inset={0} bg="blackAlpha.700" backdropFilter="blur(8px)"
            zIndex={2000} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={close}
          />
          <MotionBox
            position="fixed" top={{ base: "10%", md: "18%" }} left="50%" zIndex={2001}
            w={{ base: "calc(100vw - 24px)", md: "580px" }}
            initial={{ opacity: 0, y: -12, scale: 0.98, x: "-50%" }}
            animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
            exit={{ opacity: 0, y: -12, scale: 0.98, x: "-50%" }}
            transition={{ type: "spring", stiffness: 500, damping: 35 }}
          >
            <Box
              bg={bg} borderRadius="2xl" border="1px solid" borderColor={border}
              shadow="0 25px 80px -12px rgba(0,0,0,0.5)" overflow="hidden"
            >
              {/* Input */}
              <Box px={4} pt={4} pb={2}>
                <InputGroup size="lg">
                  <InputLeftElement pointerEvents="none">
                    <Search size={17} opacity={0.3} />
                  </InputLeftElement>
                  <Input
                    ref={inputRef} value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search products, or ask AI anything..."
                    border="none" _focus={{ shadow: "none" }}
                    fontSize="sm" fontWeight="500" fontFamily="body"
                    bg="transparent"
                  />
                </InputGroup>
              </Box>

              {/* AI Response banner */}
              {aiResponse && (
                <HStack px={5} py={2} spacing={2} borderTop="1px solid" borderColor={border}>
                  <Zap size={13} color="#c8ff00" />
                  <Text fontSize="xs" fontWeight="600" color="volt.lime" fontFamily="heading">
                    {aiResponse}
                  </Text>
                </HStack>
              )}

              <Box h="1px" bg={border} />

              {/* Results */}
              <VStack spacing={0} align="stretch" px={2} py={2} maxH="340px" overflowY="auto"
                css={{ "&::-webkit-scrollbar": { width: "4px" }, "&::-webkit-scrollbar-thumb": { background: "rgba(255,255,255,0.08)", borderRadius: "full" } }}
              >
                {/* Category headers inline */}
                {allItems.map((item, i) => {
                  const prev = allItems[i - 1];
                  const showHeader = !prev || prev.category !== item.category;
                  const headerLabel = item.category === "product" ? "Products"
                    : item.category === "ai" ? "AI Results"
                    : item.category === "navigation" ? "Go to"
                    : "Actions";

                  return (
                    <Box key={item.id}>
                      {showHeader && (
                        <HStack px={3} pt={i > 0 ? 2 : 1} pb={1} spacing={1.5}>
                          {item.category === "ai" && <Sparkles size={10} color="#c8ff00" />}
                          <Text fontSize="2xs" fontWeight="700" letterSpacing="0.08em" textTransform="uppercase" color={muted} fontFamily="heading">
                            {headerLabel}
                          </Text>
                        </HStack>
                      )}
                      <HStack
                        px={3} py={2} borderRadius="lg" cursor="pointer"
                        bg={selectedIndex === i ? selectedBg : "transparent"}
                        _hover={{ bg: hoverBg }}
                        onClick={item.action}
                        onMouseEnter={() => setSelectedIndex(i)}
                        spacing={3} transition="background 0.1s"
                      >
                        {item.image ? (
                          <Image src={item.image} alt="" w="34px" h="34px" borderRadius="lg" objectFit="cover" flexShrink={0} />
                        ) : (
                          <Flex w={7} h={7} borderRadius="lg" bg={useColorModeValue("blackAlpha.50", "whiteAlpha.50")} align="center" justify="center" color={muted} flexShrink={0}>
                            {item.icon}
                          </Flex>
                        )}
                        <Box flex={1} minW={0}>
                          <Text fontSize="sm" fontWeight="500" noOfLines={1} fontFamily="body">{item.label}</Text>
                          {item.subtitle && <Text fontSize="xs" color={muted} noOfLines={1}>{item.subtitle}</Text>}
                        </Box>
                        {selectedIndex === i && <ArrowRight size={13} opacity={0.3} />}
                      </HStack>
                    </Box>
                  );
                })}

                {allItems.length === 0 && query.length > 0 && (
                  <VStack py={8} spacing={2} color={muted}>
                    <Search size={20} opacity={0.2} />
                    <Text fontSize="xs" fontFamily="body">No results for "{query}"</Text>
                  </VStack>
                )}

                {query.length === 0 && (
                  <Box px={3} pt={3} pb={1}>
                    <HStack spacing={2} color={muted}>
                      <Zap size={12} />
                      <Text fontSize="2xs" fontFamily="body">
                        Try: "find me black sneakers under $200"
                      </Text>
                    </HStack>
                  </Box>
                )}
              </VStack>

              {/* Footer */}
              <Flex px={4} py={2} borderTop="1px solid" borderColor={border} align="center" justify="space-between">
                <HStack spacing={4} fontSize="2xs" color={muted} fontFamily="heading">
                  <HStack spacing={1}><Text>↑↓</Text><Text>navigate</Text></HStack>
                  <HStack spacing={1}><Text>↵</Text><Text>select</Text></HStack>
                </HStack>
                <Text fontSize="2xs" color={muted} fontFamily="heading">{os.mod}+K</Text>
              </Flex>
            </Box>
          </MotionBox>
        </>
      )}
    </AnimatePresence>
  );
}
