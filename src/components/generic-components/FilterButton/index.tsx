import { Button, styled } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { useState } from "react";

export const FilterButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [itemsSelected, setItemsSelected] = useState(5);
  return (
    <FilterButtonWrapper
      onClick={(event) => {
        event.stopPropagation();
        setIsOpen((prev) => !prev);
      }}
    >
      Marca
      {itemsSelected > 0 && (
        <span
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "black",
            borderRadius: "50%",
            color: "white",
            width: 25,
            marginLeft: 15,
            marginRight: 15,
            height: 25,
          }}
        >
          {itemsSelected}
        </span>
      )}
      {isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
    </FilterButtonWrapper>
  );
};

const FilterButtonWrapper = styled(Button)`
  border: 1px solid black;
  height: 45px;
`;
