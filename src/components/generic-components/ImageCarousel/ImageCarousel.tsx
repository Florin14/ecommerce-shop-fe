import React, { useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { css, styled } from "@mui/material";

const Carousel = ({ images }) => {
  const [slide, setSlide] = useState(0);

  const nextSlide = () => {
    setSlide(slide === images.length - 1 ? 0 : slide + 1);
  };

  const prevSlide = () => {
    setSlide(slide === 0 ? images.length - 1 : slide - 1);
  };

  return (
    <CarouselWrapper>
      {slide !== 0 && <KeyboardArrowLeftIconItem onClick={prevSlide} />}

      {images?.map((item, idx) => {
        return (
          <SlideImage
            src={
              typeof item?.imageData === "string"
                ? `data:image/jpeg;base64,${item?.imageData}`
                : URL.createObjectURL(item?.imageData)
            }
            alt={item.alt}
            key={idx}
            show={slide === idx}
          />
        );
      })}
      {slide !== images?.length - 1 && (
        <KeyboardArrowRightIconItem onClick={nextSlide} />
      )}
      <Indicators>
        {images?.map((_, idx: number) => {
          return (
            <Indicator
              key={idx}
              isInactive={slide === idx}
              onClick={() => setSlide(idx)}
            ></Indicator>
          );
        })}
      </Indicators>
    </CarouselWrapper>
  );
};

export default Carousel;

const CarouselWrapper = styled("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Indicators = styled("span")`
  display: flex;
  position: absolute;
  bottom: 1rem;
`;

const Indicator = styled("span")<{ isInactive?: boolean }>`
  background-color: white;
  height: 0.5rem;
  width: 0.5rem;
  border-radius: 100%;
  border: none;
  outline: none;
  box-shadow: 0px 0px 5px #555;
  // outline: black;
  margin: 0 0.2rem;
  cursor: pointer;
  ${(props) =>
    !props.isInactive
      ? css`
          background-color: white;
        `
      : css`
          background-color: #303030;
          width: 1rem;
        `}
`;

const KeyboardArrowLeftIconItem = styled(KeyboardArrowLeftIcon)`
  position: absolute;
  filter: drop-shadow(0px 0px 5px #555);
  width: 2rem;
  height: 2rem;
  color: white;
  left: 0;
  border-radius: 50%;

  :hover {
    opacity: 0.5;
    background: black;
    cursor: pointer;
  }
`;

const KeyboardArrowRightIconItem = styled(KeyboardArrowRightIcon)`
  position: absolute;
  filter: drop-shadow(0px 0px 5px #555);
  width: 2rem;
  height: 2rem;
  color: white;
  right: 0;
  border-radius: 50%;

  :hover {
    opacity: 0.5;
    background: black;
    cursor: pointer;
  }
`;
const SlideImage = styled("img")<{ show?: boolean }>`
  // border-radius: 0.5rem;
  // box-shadow: 0px 0px 7px #666;
  border-radius: 10px;
  object-fit: contain;
  width: 100%;
  height: 100%;
  ${(props) =>
    !props.show &&
    css`
      display: none;
    `}
`;
