import { useState } from "react";
import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Input,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { Plus, Trash2 } from "lucide-react";
import { useGetCategoriesQuery, useCreateCategoryMutation, useDeleteCategoryMutation } from "../../store/api/categoriesApi";

export default function AdminCategories() {
  const { data: categories } = useGetCategoriesQuery();
  const [createCategory] = useCreateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [newName, setNewName] = useState("");
  const toast = useToast();
  const bg = useColorModeValue("white", "gray.800");

  const handleCreate = async () => {
    if (!newName.trim()) return;
    try {
      await createCategory({ name: newName }).unwrap();
      setNewName("");
      toast({ title: "Category created", status: "success", duration: 2000 });
    } catch {
      toast({ title: "Failed", status: "error", duration: 2000 });
    }
  };

  return (
    <Box>
      <Heading size="lg" mb={6}>Categories</Heading>
      <HStack mb={6}>
        <Input placeholder="New category name..." value={newName} onChange={(e) => setNewName(e.target.value)} maxW="300px" borderRadius="full" onKeyDown={(e) => e.key === "Enter" && handleCreate()} />
        <Button variant="primary" leftIcon={<Plus size={18} />} onClick={handleCreate}>Add</Button>
      </HStack>
      <Box bg={bg} borderRadius="2xl" shadow="sm" overflow="hidden">
        <Table variant="simple">
          <Thead><Tr><Th>ID</Th><Th>Name</Th><Th>Actions</Th></Tr></Thead>
          <Tbody>
            {categories?.map((c) => (
              <Tr key={c.id}>
                <Td>{c.id}</Td>
                <Td fontWeight="500">{c.name}</Td>
                <Td>
                  <IconButton aria-label="Delete" icon={<Trash2 size={16} />} size="sm" variant="ghost" colorScheme="red" onClick={() => deleteCategory(c.id)} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}
