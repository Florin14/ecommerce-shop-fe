import { Button, styled } from "@mui/material";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../../store/hooks";
import { getProductDetails } from "../../../store/slices/products/thunks";

const ProductDetailPage = () => {
  const { productId } = useParams();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(getProductDetails({ id: productId }));
  }, [productId]);
  return (
    <Container>
      <GoBackButton
        color="info"
        variant="outlined"
        onClick={() => handleGoBack()}
      >
        Create
      </GoBackButton>
    </Container>
  );
};

export default ProductDetailPage;

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100%;
  gap: 20px;
  padding-top: 60px;
`;

const GoBackButton = styled(Button)`
  background-color: #202b3c;
  color: white;
  cursor: pointer;
  :hover {
    background-color: #202b3c;
    opacity: 0.5;

    // border: 0;
  }
`;
