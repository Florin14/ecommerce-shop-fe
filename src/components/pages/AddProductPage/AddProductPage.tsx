import React, { useEffect, useState } from "react";

import {
  styled,
  Typography,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { CreateProductModal } from "../../generic-components/modals/CreateProductModal";
import { getProducts } from "../../../store/slices/products/thunks";
import { RootState } from "../../../store";
import { ProductCard } from "../../generic-components/ProductCard";
import { ProductResponseDTO } from "../../../types/products/Products";
import TuneIcon from "@mui/icons-material/Tune";
import { ProductsDrawer } from "../../generic-components/ProductsDrawer";
import Banner from "../../generic-components/Banner";

const filtersOptions = [
  { id: 1, name: "Pret crescator", sortBy: "price", sortType: "asc" },
  { id: 2, name: "Pret descrescator", sortBy: "price", sortType: "desc" },
];

const ProductsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(
    (state: RootState) => state.products.products
  );

  const sortBy = useAppSelector((state: RootState) => state.products.sortBy);

  const sortType = useAppSelector(
    (state: RootState) => state.products.sortType
  );

  useEffect(() => {
    dispatch(getProducts({ sortBy, sortType }));
  }, [sortBy, sortType]);

  const [createProductOpen, setCreateProductOpen] = useState(false);

  const handleCloseCreateProduct = () => {
    setCreateProductOpen(false);
  };

  const [isOpen, setState] = useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState(open);
    };

  return (
    <Container>
      <Title variant="overline">Products</Title>

      <CreateProductButton
        variant="outlined"
        color="secondary"
        onClick={() => setCreateProductOpen(true)}
      >
        <AddIcon /> Create Product
      </CreateProductButton>
      <Banner/>
      <FiltersSection>
        <FiltersList>
          <Button onClick={toggleDrawer(true)}>
            Filtre <TuneIcon />
          </Button>

          <ProductsDrawer isOpen={isOpen} toggleDrawer={toggleDrawer} />
        </FiltersList>
        <Sorting>Ordoneaza: </Sorting>
      </FiltersSection>
      <ProductsSection>
        {products?.map((product: ProductResponseDTO) => (
          <ProductCard
            key={product?.id}
            id={product?.id}
            name={product?.name}
            description={product?.description}
            price={product?.price}
            images={product?.images}
            brandName={product?.brandName}
            categoryName={product?.categoryName}
            stockQuantity={product?.stockQuantity}
          />
        ))}
      </ProductsSection>
      {/* <PaymentCard /> */}
      <CreateProductModal
        isOpen={createProductOpen}
        onClose={handleCloseCreateProduct}
        // announcement={updatedAnnouncement}
      />
    </Container>
  );
};

export default ProductsPage;

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100%;
  gap: 20px;
  padding-top: 80px;
`;

const Title = styled(Typography)`
  font-weight: 600;
  font-size: 24px;
`;

const ProductsSection = styled("div")`
  display: grid;
  // flex-direction: column;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 40px;
  width: 100%;
  padding: 20px;
`;

const CreateProductButton = styled(Button)`
  padding: 30px;
  width: 500px;
  display: flex;
  gap: 5px;
  font-size: 16px;
`;

const FiltersSection = styled("div")`
  display: flex;
  width: calc(100% - 40px);
  height: 150px;
  background: white;
  border-radius: 20px;
  padding: 20px;
`;

const FiltersList = styled("div")`
  display: grid;
  width: 100%;
`;

const Sorting = styled("div")`
  width: 100%;
`;
