import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Input,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { Plus, Trash2 } from "lucide-react";
import { useGetBrandsQuery, useCreateBrandMutation, useDeleteBrandMutation } from "../../store/api/brandsApi";

export default function AdminBrands() {
  const { data: brands } = useGetBrandsQuery();
  const [createBrand] = useCreateBrandMutation();
  const [deleteBrand] = useDeleteBrandMutation();
  const [newName, setNewName] = useState("");
  const toast = useToast();
  const bg = useColorModeValue("white", "gray.800");

  const handleCreate = async () => {
    if (!newName.trim()) return;
    try {
      await createBrand({ name: newName }).unwrap();
      setNewName("");
      toast({ title: "Brand created", status: "success", duration: 2000 });
    } catch {
      toast({ title: "Failed", status: "error", duration: 2000 });
    }
  };

  return (
    <Box>
      <Heading size="lg" mb={6}>Brands</Heading>
      <HStack mb={6}>
        <Input placeholder="New brand name..." value={newName} onChange={(e) => setNewName(e.target.value)} maxW="300px" borderRadius="full" onKeyDown={(e) => e.key === "Enter" && handleCreate()} />
        <Button variant="primary" leftIcon={<Plus size={18} />} onClick={handleCreate}>Add</Button>
      </HStack>
      <Box bg={bg} borderRadius="2xl" shadow="sm" overflow="hidden">
        <Table variant="simple">
          <Thead><Tr><Th>ID</Th><Th>Name</Th><Th>Actions</Th></Tr></Thead>
          <Tbody>
            {brands?.map((b) => (
              <Tr key={b.id}>
                <Td>{b.id}</Td>
                <Td fontWeight="500">{b.name}</Td>
                <Td>
                  <IconButton aria-label="Delete" icon={<Trash2 size={16} />} size="sm" variant="ghost" colorScheme="red" onClick={() => deleteBrand(b.id)} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}
