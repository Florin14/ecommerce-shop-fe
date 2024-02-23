import React, { useEffect, useState } from "react";

import { styled, Tabs, Tab, Typography, css, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { CreateProductModal } from "../../generic-components/modals/CreateProductModal";
import { PaymentCard } from "../../generic-components/PaymentCard/PaymentCard";
import { getProducts } from "../../../store/slices/products/thunks";



const ProductsPage: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProducts({}));
  }, []);


  const [createProductOpen, setCreateProductOpen] = useState(false);
 

  const handleCloseCreateProduct = () => {
    setCreateProductOpen(false);
  };

  return (
    <Container>
      {/* {searchDone && (
        <Button onClick={() => dispatch(fetchAnnouncements())} color="secondary">
          Back to all announcements
        </Button>
      )} */}
      <Title variant="overline">Products</Title>

      <CreateProductButton
        variant="outlined"
        color="secondary"
        onClick={() => setCreateProductOpen(true)}
      >
        <AddIcon /> Create Product
      </CreateProductButton>
      <PaymentCard />
      <CreateProductModal
        isOpen={createProductOpen}
        onClose={handleCloseCreateProduct}
        // announcement={updatedAnnouncement}
      />
      {/* <Tabs value={selectedCategory} onChange={handleCategorySelection} indicatorColor="secondary">
        <StyledTab label="Feed" aria-selected={AnnouncementCategory.FEED === selectedCategory} />
        {role === Role.MENTOR && (
          <StyledTab label="Your's" aria-selected={AnnouncementCategory.FOLLOWED === selectedCategory} />
        )}
      </Tabs> */}
      {/* {[announcementsData, myAnnouncements].map(renderAnnouncements)} */}
    </Container>
  );
};

export default ProductsPage;

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 20px;
  padding-top: 60px;
`;

const Title = styled(Typography)`
  font-weight: 600;
  font-size: 24px;
`;

const Announcements = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 600px;
  margin-top: 20px;
`;

const EmptyAnnouncementsText = styled(Typography)`
  margin: 20px 0;
`;

const StyledTab = styled(Tab)`
  ${(props) =>
    props["aria-selected"] &&
    css`
      color: ${props.theme.palette.secondary.main} !important;
    `}
`;

const CreateProductButton = styled(Button)`
  padding: 30px;
  width: 500px;
  display: flex;
  gap: 5px;
  font-size: 16px;
`;

Container.displayName = "Products Page";

export { Container };
