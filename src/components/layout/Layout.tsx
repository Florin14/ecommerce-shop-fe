import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { CommandBar } from "../ui/CommandBar";

export function Layout() {
  return (
    <Flex direction="column" minH="100vh">
      <Navbar />
      <Box flex={1}>
        <Outlet />
      </Box>
      <Footer />
      <CommandBar />
    </Flex>
  );
}
