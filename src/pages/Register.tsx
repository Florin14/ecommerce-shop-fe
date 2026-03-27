import { Box, Button, Flex, FormControl, FormLabel, Grid, Heading, Input, Text, useColorModeValue, useToast, VStack } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../store/api/authApi";
import { useAuth } from "../hooks/useAuth";
import { ShoppingBag } from "lucide-react";

const glow = keyframes`0%,100%{opacity:0.03}50%{opacity:0.06}`;

interface RegisterForm { full_name: string; username: string; password: string; }

export default function Register() {
  const { register: reg, handleSubmit, formState: { isSubmitting } } = useForm<RegisterForm>();
  const [registerUser] = useRegisterMutation();
  const { loginSuccess } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const onSubmit = async (data: RegisterForm) => {
    try {
      const result = await registerUser(data).unwrap();
      loginSuccess(result.access_token, result.refresh_token);
      navigate("/");
      toast({ title: "Account created!", status: "success", duration: 3000 });
    } catch { toast({ title: "Registration failed", description: "Email may already be in use", status: "error", duration: 3000 }); }
  };

  return (
    <Grid minH="100vh" templateColumns={{ base: "1fr", lg: "1fr 1fr" }}>
      {/* Form */}
      <Flex align="center" justify="center" position="relative" overflow="hidden"
        bg={useColorModeValue("volt.lightBg", "volt.surface")}
        bgGradient={{ base: useColorModeValue(
          "linear(to-bl, #ecfdf5, #fafaf9, #f0fdd4)",
          "linear(to-bl, #09090b, #001a0d, #09090b)"
        ), lg: "none" }}
        px={{ base: 6, md: 12 }} order={{ base: 1, lg: 0 }}
      >
        {/* Mobile gradient orbs */}
        <Box display={{ base: "block", lg: "none" }}
          position="absolute" bottom="-15%" right="-10%" w="300px" h="300px" borderRadius="full"
          bgGradient="linear(to-tr, #00cc66, volt.lime)" filter="blur(120px)"
          opacity={useColorModeValue(0.12, 0.06)} pointerEvents="none"
        />
        <Box display={{ base: "block", lg: "none" }}
          position="absolute" top="-15%" left="-10%" w="250px" h="250px" borderRadius="full"
          bgGradient="linear(to-br, volt.lime, #00ff88)" filter="blur(100px)"
          opacity={useColorModeValue(0.08, 0.04)} pointerEvents="none"
        />
        <Box w="full" maxW="380px" position="relative" zIndex={1}>
          <VStack spacing={7} as="form" onSubmit={handleSubmit(onSubmit)} align="stretch">
            <Box>
              <Text fontFamily="heading" fontWeight="700" fontSize="md" letterSpacing="-0.04em" mb={6}>
                GRIFO<Text as="span" color="volt.lime">.</Text>
              </Text>
              <Heading size="lg" fontFamily="heading" mb={1}>Create account</Heading>
              <Text color={useColorModeValue("gray.500", "volt.secondary")} fontSize="sm" fontFamily="body">Join the future of shopping</Text>
            </Box>
            <VStack spacing={3}>
              <FormControl>
                <FormLabel fontSize="2xs" fontWeight="700" letterSpacing="0.08em" textTransform="uppercase" fontFamily="heading" color={useColorModeValue("gray.500", "volt.secondary")} mb={1}>Name</FormLabel>
                <Input {...reg("full_name", { required: true })} placeholder="John Doe" borderRadius="lg" h="46px" fontSize="sm" />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="2xs" fontWeight="700" letterSpacing="0.08em" textTransform="uppercase" fontFamily="heading" color={useColorModeValue("gray.500", "volt.secondary")} mb={1}>Email</FormLabel>
                <Input {...reg("username", { required: true })} type="email" placeholder="you@example.com" borderRadius="lg" h="46px" fontSize="sm" />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="2xs" fontWeight="700" letterSpacing="0.08em" textTransform="uppercase" fontFamily="heading" color={useColorModeValue("gray.500", "volt.secondary")} mb={1}>Password</FormLabel>
                <Input {...reg("password", { required: true, minLength: 6 })} type="password" placeholder="Min 6 characters" borderRadius="lg" h="46px" fontSize="sm" />
              </FormControl>
            </VStack>
            <Button type="submit" variant="volt" size="lg" w="full" isLoading={isSubmitting} borderRadius="lg" h="46px" fontSize="sm">Create Account</Button>
            <Text fontSize="xs" color={useColorModeValue("gray.400", "volt.muted")} textAlign="center" fontFamily="body">
              Have an account? <Link to="/login"><Text as="span" color="volt.lime" fontWeight="600">Sign in</Text></Link>
            </Text>
          </VStack>
        </Box>
      </Flex>
      {/* Decorative */}
      <Flex display={{ base: "none", lg: "flex" }} position="relative" overflow="hidden" align="center" justify="center"
        bgGradient="linear(to-bl, #09090b, #001a0d, #09090b, #0d1a00)"
      >
        <Box position="absolute" bottom="25%" right="25%" w="350px" h="350px" borderRadius="full" bgGradient="linear(to-tr, #00cc66, volt.lime)" filter="blur(160px)" opacity={0.1} animation={`${glow} 9s ease-in-out infinite`} />
        <Box position="absolute" top="25%" left="20%" w="280px" h="280px" borderRadius="full" bgGradient="linear(to-br, volt.lime, #00ff88)" filter="blur(140px)" opacity={0.06} animation={`${glow} 12s ease-in-out infinite reverse`} />
        <VStack spacing={5} position="relative" color="white" textAlign="center" px={10}>
          <Flex w={12} h={12} borderRadius="xl" bg="volt.lime" color="volt.bg" align="center" justify="center"><ShoppingBag size={24} /></Flex>
          <Heading size="xl" fontFamily="heading">Start your<br />journey<Text as="span" color="volt.lime">.</Text></Heading>
          <Text fontSize="sm" opacity={0.35} maxW="300px" fontFamily="body" lineHeight="1.8">
            Exclusive drops. AI recommendations. Member-only pricing.
          </Text>
        </VStack>
      </Flex>
    </Grid>
  );
}
