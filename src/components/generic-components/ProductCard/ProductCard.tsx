import React from "react";

import { styled } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useNavigate } from "react-router-dom";
import Carousel from "../ImageCarousel/ImageCarousel";
import imageNotFound from "../../../assets/ImageNotFound.png";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { formatNumberWithTwoDecimals } from "../../../utils/app-utils";
interface ProductImageResponseDTO {
  id: number;
  imageData: string;
  imageName: string | null;
}

interface ProductCardProps {
  id: number;
  name: string;
  description: string;
  brandName: string;
  categoryName: string;
  stockQuantity: number;
  price: number;
  images: ProductImageResponseDTO[];
  // onUpdateClick: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = (props) => {
  const dispatch = useAppDispatch();
  // const userData = useAppSelector()
  // const isMentor = userData?.role === 'MENTOR'
  const { id, name, description, price, images } = props;
  const navigate = useNavigate();
  const handleProductClick = () => {
    // Navigate to the product page with the given productId
    navigate(`/admin/products/${id}`);
  };

  const handleDelete = () => {
    // dispatch(deleteAnnouncement(id)).then(() => {
    //   dispatch(
    //     displaySnackbar({
    //       open: true,
    //       type: 'success',
    //       message: 'Ad deleted',
    //     })
    //   )
    // })
    // dispatch(fetchAnnouncements())
  };

  return (
    <Wrapper key={id}>
      <WishlistIconWraper>
        <FavoriteBorderIconItem />
      </WishlistIconWraper>
      <ImagesSection>
        <CarouselWrapper>
          {images?.length > 0 ? (
            <Carousel images={images} />
          ) : (
            <NoImageFound src={imageNotFound} alt=" No images found" />
          )}
        </CarouselWrapper>
      </ImagesSection>
      <InfoSection onClick={handleProductClick}>
        <Name>{name || ""}</Name>
        <Description>{description || ""}</Description>
        <PriceSection>
          {(price && formatNumberWithTwoDecimals(price)) || "-"} RON
        </PriceSection>
      </InfoSection>
    </Wrapper>
  );
};

const Wrapper = styled("div")`
  display: grid;
  grid-template-rows: 230px 1fr;
  position: relative;
  // flex-direction: column;
  // justify-content: space-between;
  // gap: 5px;
  width: 100%;
  height: 350px;
  box-shadow:
    rgba(17, 17, 26, 0.1) 0 2px 8px,
    rgba(17, 17, 26, 0.05) 0 4px 16px;
  // background: #303030;
  border-radius: 8px;
  cursor: pointer;
  :hover {
    outline: 1px solid #777;
  }
`;

const ImagesSection = styled("div")`
  display: flex;
  justify-content: center;
  // margin: auto;
  align-items: center;
  background: black;
  width: 100%;
  height: 100%;
  border-radius: 8px 8px 0 0;
`;

const NoImageFound = styled("img")`
  object-fit: contain;
  width: 100%;
  height: 100%;
`;

const InfoSection = styled("div")`
  height: 100%;
  width: 100%;
  padding: 15px;
`;

const Name = styled("div")`
  color: white;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 5px;
`;

const Description = styled("div")`
  color: #bfbfbf;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 5px;
`;

const PriceSection = styled("div")`
  font-size: 16px;
  font-weight: 700;
  color: #303030;
  width: fit-content;
  padding: 2px 5px;
  border-radius: 3px;
  margin-top: 10px;
  background: white;
`;

const FavoriteBorderIconItem = styled(FavoriteBorderIcon)`
  color: #11998e;

  :hover {
    cursor: pointer;
  }
`;

const CarouselWrapper = styled("div")`
  width: 100%;
  height: 100%;
  padding: 20px 15px;
  border-radius: 10px;
  // object-fit: contain;
  background: black;
`;

const WishlistIconWraper = styled("div")`
  position: absolute;
  top: 15px;
  right: 0px;
  align-items: center;
  justify-content: center;
  display: flex;
  background: white;
  border-radius: 5px 0 0 5px;
  width: 40px;
  height: 30px;
  z-index: 2;
`;
