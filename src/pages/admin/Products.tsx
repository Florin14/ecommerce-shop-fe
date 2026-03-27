import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Image,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useToast,
  Badge,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Select,
  VStack,
  Textarea,
} from "@chakra-ui/react";
import { Edit2, Plus, Search, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  useGetProductsQuery,
  useGetProductResourcesQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from "../../store/api/productsApi";

export default function AdminProducts() {
  const { data: products, isLoading } = useGetProductsQuery();
  const { data: resources } = useGetProductResourcesQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const [createProduct] = useCreateProductMutation();
  const toast = useToast();
  const bg = useColorModeValue("white", "gray.800");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit, reset } = useForm();
  const [search, setSearch] = useState("");

  const filtered = products?.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: number) => {
    try {
      await deleteProduct(id).unwrap();
      toast({ title: "Product deleted", status: "success", duration: 2000 });
    } catch {
      toast({ title: "Failed to delete", status: "error", duration: 2000 });
    }
  };

  const handleCreate = async (data: Record<string, string>) => {
    const formData = new FormData();
    formData.append("product_data", JSON.stringify({
      name: data.name,
      description: data.description,
      price: parseFloat(data.price),
      sku: data.sku,
      brand_id: parseInt(data.brand_id),
      category_id: parseInt(data.category_id),
      gender_id: parseInt(data.gender_id),
    }));
    try {
      await createProduct(formData).unwrap();
      toast({ title: "Product created", status: "success", duration: 2000 });
      onClose();
      reset();
    } catch {
      toast({ title: "Failed to create", status: "error", duration: 2000 });
    }
  };

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg">Products</Heading>
        <Button variant="primary" leftIcon={<Plus size={18} />} onClick={onOpen}>
          Add Product
        </Button>
      </Flex>

      <InputGroup mb={6} maxW="400px">
        <InputLeftElement><Search size={18} color="gray" /></InputLeftElement>
        <Input placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} borderRadius="full" />
      </InputGroup>

      <Box bg={bg} borderRadius="2xl" shadow="sm" overflow="hidden">
        <Box overflowX="auto">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Product</Th>
                <Th>SKU</Th>
                <Th>Price</Th>
                <Th>Brand</Th>
                <Th>Category</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filtered?.map((product) => (
                <Tr key={product.id}>
                  <Td>
                    <HStack>
                      <Image
                        src={product.images?.[0]?.image_url || "https://via.placeholder.com/40"}
                        w="40px" h="40px" borderRadius="lg" objectFit="cover"
                      />
                      <Text fontWeight="500" noOfLines={1}>{product.name}</Text>
                    </HStack>
                  </Td>
                  <Td><Text fontSize="sm" color="gray.500">{product.sku || "—"}</Text></Td>
                  <Td fontWeight="600">${product.price.toFixed(2)}</Td>
                  <Td><Badge borderRadius="full">{product.brand_name}</Badge></Td>
                  <Td><Badge borderRadius="full" colorScheme="blue">{product.category_name}</Badge></Td>
                  <Td>
                    <HStack spacing={1}>
                      <IconButton aria-label="Edit" icon={<Edit2 size={16} />} size="sm" variant="ghost" />
                      <IconButton aria-label="Delete" icon={<Trash2 size={16} />} size="sm" variant="ghost" colorScheme="red" onClick={() => handleDelete(product.id)} />
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>

      {/* Create Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent borderRadius="2xl">
          <ModalHeader>Add Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4} as="form" onSubmit={handleSubmit(handleCreate)}>
              <FormControl><FormLabel>Name</FormLabel><Input {...register("name")} borderRadius="xl" /></FormControl>
              <FormControl><FormLabel>Description</FormLabel><Textarea {...register("description")} borderRadius="xl" /></FormControl>
              <HStack w="full">
                <FormControl><FormLabel>Price</FormLabel><Input {...register("price")} type="number" step="0.01" borderRadius="xl" /></FormControl>
                <FormControl><FormLabel>SKU</FormLabel><Input {...register("sku")} borderRadius="xl" /></FormControl>
              </HStack>
              <HStack w="full">
                <FormControl><FormLabel>Brand</FormLabel>
                  <Select {...register("brand_id")} borderRadius="xl">
                    {resources?.brands.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
                  </Select>
                </FormControl>
                <FormControl><FormLabel>Category</FormLabel>
                  <Select {...register("category_id")} borderRadius="xl">
                    {resources?.categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </Select>
                </FormControl>
                <FormControl><FormLabel>Gender</FormLabel>
                  <Select {...register("gender_id")} borderRadius="xl">
                    {resources?.genders.map((g) => <option key={g.id} value={g.id}>{g.name}</option>)}
                  </Select>
                </FormControl>
              </HStack>
              <Button type="submit" variant="primary" w="full">Create Product</Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
