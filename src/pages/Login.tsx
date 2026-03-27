import { Box, Button, Flex, FormControl, FormLabel, Grid, Heading, Input, Text, useColorModeValue, useToast, VStack } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../store/api/authApi";
import { useAuth } from "../hooks/useAuth";
import { Zap } from "lucide-react";

const glow = keyframes`0%,100%{opacity:0.03}50%{opacity:0.06}`;

interface LoginForm { username: string; password: string; }

export default function Login() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<LoginForm>();
  const [login] = useLoginMutation();
  const { loginSuccess } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const border = useColorModeValue("volt.lightBorder", "volt.border");

  const onSubmit = async (data: LoginForm) => {
    try {
      const result = await login(data).unwrap();
      loginSuccess(result.access_token, result.refresh_token);
      navigate("/");
    } catch { toast({ title: "Invalid credentials", status: "error", duration: 3000 }); }
  };

  return (
    <Grid minH="100vh" templateColumns={{ base: "1fr", lg: "1fr 1fr" }}>
      {/* Decorative */}
      <Flex display={{ base: "none", lg: "flex" }} position="relative" overflow="hidden" align="center" justify="center"
        bgGradient="linear(to-br, #09090b, #0d1a00, #09090b, #001a0d)"
      >
        <Box position="absolute" top="20%" left="20%" w="400px" h="400px" borderRadius="full" bgGradient="linear(to-br, volt.lime, #00ff88)" filter="blur(160px)" opacity={0.1} animation={`${glow} 8s ease-in-out infinite`} />
        <Box position="absolute" bottom="20%" right="25%" w="300px" h="300px" borderRadius="full" bgGradient="linear(to-tr, #00cc66, volt.lime)" filter="blur(140px)" opacity={0.07} animation={`${glow} 11s ease-in-out infinite reverse`} />
        <VStack spacing={5} position="relative" color="white" textAlign="center" px={10}>
          <Flex w={12} h={12} borderRadius="xl" bg="volt.lime" color="volt.bg" align="center" justify="center"><Zap size={24} /></Flex>
          <Heading size="xl" fontFamily="heading">Move different<Text as="span" color="volt.lime">.</Text></Heading>
          <Text fontSize="sm" opacity={0.35} maxW="300px" fontFamily="body" lineHeight="1.8">
            AI-powered shopping. Curated for you. Fast, smart, personal.
          </Text>
        </VStack>
      </Flex>

      {/* Form */}
      <Flex align="center" justify="center" position="relative" overflow="hidden"
        bg={useColorModeValue("volt.lightBg", "volt.surface")}
        bgGradient={{ base: useColorModeValue(
          "linear(to-br, #f0fdd4, #fafaf9, #ecfdf5)",
          "linear(to-br, #09090b, #0d1a00, #09090b)"
        ), lg: "none" }}
        px={{ base: 6, md: 12 }}
      >
        {/* Mobile gradient orbs (only visible on small screens when decorative panel is hidden) */}
        <Box display={{ base: "block", lg: "none" }}
          position="absolute" top="-20%" right="-15%" w="300px" h="300px" borderRadius="full"
          bgGradient="linear(to-br, volt.lime, #00ff88)" filter="blur(120px)"
          opacity={useColorModeValue(0.12, 0.06)} pointerEvents="none"
        />
        <Box display={{ base: "block", lg: "none" }}
          position="absolute" bottom="-10%" left="-15%" w="250px" h="250px" borderRadius="full"
          bgGradient="linear(to-tr, #00cc66, volt.lime)" filter="blur(100px)"
          opacity={useColorModeValue(0.08, 0.04)} pointerEvents="none"
        />
        <Box w="full" maxW="380px" position="relative" zIndex={1}>
          <VStack spacing={7} as="form" onSubmit={handleSubmit(onSubmit)} align="stretch">
            <Box>
              <Text fontFamily="heading" fontWeight="700" fontSize="md" letterSpacing="-0.04em" mb={6}>
                GRIFO<Text as="span" color="volt.lime">.</Text>
              </Text>
              <Heading size="lg" fontFamily="heading" mb={1}>Sign in</Heading>
              <Text color={useColorModeValue("gray.500", "volt.secondary")} fontSize="sm" fontFamily="body">Enter your credentials</Text>
            </Box>

            <VStack spacing={3}>
              <FormControl>
                <FormLabel fontSize="2xs" fontWeight="700" letterSpacing="0.08em" textTransform="uppercase" fontFamily="heading" color={useColorModeValue("gray.500", "volt.secondary")} mb={1}>Email</FormLabel>
                <Input {...register("username", { required: true })} type="email" placeholder="you@example.com" borderRadius="lg" h="46px" fontSize="sm" />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="2xs" fontWeight="700" letterSpacing="0.08em" textTransform="uppercase" fontFamily="heading" color={useColorModeValue("gray.500", "volt.secondary")} mb={1}>Password</FormLabel>
                <Input {...register("password", { required: true })} type="password" placeholder="Password" borderRadius="lg" h="46px" fontSize="sm" />
              </FormControl>
            </VStack>

            <Button type="submit" variant="volt" size="lg" w="full" isLoading={isSubmitting} borderRadius="lg" h="46px" fontSize="sm">Sign In</Button>
            <Text fontSize="xs" color={useColorModeValue("gray.400", "volt.muted")} textAlign="center" fontFamily="body">
              No account? <Link to="/register"><Text as="span" color="volt.lime" fontWeight="600">Create one</Text></Link>
            </Text>
          </VStack>
        </Box>
      </Flex>
    </Grid>
  );
}
