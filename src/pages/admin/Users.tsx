import {
  Avatar,
  Badge,
  Box,
  Heading,
  HStack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { baseApi } from "../../store/api/baseApi";
import { User } from "../../types";

const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({ query: () => "/users", providesTags: ["Users"] }),
  }),
});

const { useGetUsersQuery } = usersApi;

export default function AdminUsers() {
  const { data: users } = useGetUsersQuery();
  const bg = useColorModeValue("white", "gray.800");

  return (
    <Box>
      <Heading size="lg" mb={6}>Users</Heading>
      <Box bg={bg} borderRadius="2xl" shadow="sm" overflow="hidden">
        <Box overflowX="auto">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>User</Th>
                <Th>Email</Th>
                <Th>Role</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users?.map((user) => (
                <Tr key={user.id}>
                  <Td>
                    <HStack>
                      <Avatar size="sm" name={user.full_name} />
                      <Text fontWeight="500">{user.full_name}</Text>
                    </HStack>
                  </Td>
                  <Td color="gray.500">{user.username}</Td>
                  <Td>
                    <Badge colorScheme={user.role === "ADMIN" ? "purple" : "blue"} borderRadius="full">
                      {user.role}
                    </Badge>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
    </Box>
  );
}
