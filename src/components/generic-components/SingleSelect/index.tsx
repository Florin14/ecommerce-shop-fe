import React, { MouseEvent, useState } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useAppDispatch } from "../../../store/hooks";
import { productActions } from "../../../store/slices/products/products-slice";

const options = [
 { name: "Implicit", sortBy: null, sortType: null},
 { name: "Pret crescator", sortBy: "price", sortType: "asc"},
 { name: "Pret descrescator", sortBy: "price", sortType: "desc"},
 { name: "Data aparitiei", sortBy: "date", sortType: "asc"},
];

export const SimpleListMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const open = Boolean(anchorEl);
  const dispatch = useAppDispatch()
  const handleClickListItem = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (
    event: MouseEvent<HTMLElement>,
    index: number,
    option: any,
  ) => {
    event.stopPropagation();
    setSelectedIndex(index);
    dispatch(productActions.setSortBy(option.sortBy))
    dispatch(productActions.setSortType(option.sortType))
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <List
        component="nav"
        aria-label="Device settings"
        sx={{
          bgcolor: "background.paper",
          padding: 0,
          border: "1px solid black",
        }}
      >
        <ListItemButton
          id="lock-button"
          aria-haspopup="listbox"
          aria-controls="lock-menu"
          aria-label="sort-menu"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClickListItem}
        >
          <ListItemText primary="Sortare" secondary={options[selectedIndex]?.name} />
        </ListItemButton>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "lock-button",
          role: "listbox",
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option?.name}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index, option)}
          >
            {option?.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
