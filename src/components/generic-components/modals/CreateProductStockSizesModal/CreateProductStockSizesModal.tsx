import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  styled,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";

import { RootState } from "../../../../store";
import DeleteIcon from "../../../generic-components/icons/DeleteIcon";

export type ProductStock = {
  sizeId: number | null;
  stockQuantity: number | null;
};

export type AddProductStock = {
  size: number | null;
  stockQuantity: number | null;
};

interface CreateProductStockSizesModalProps {
  isOpen: boolean;
  onClose: () => void;
  setProductStock: (productStock: ProductStock[]) => void;
  productStock: ProductStock[];
}

export const CreateProductStockSizesModal: React.FC<
  CreateProductStockSizesModalProps
> = ({ isOpen, onClose, productStock, setProductStock }) => {
  const sizes = useAppSelector(
    (state: RootState) => state.products.resources.productSizes
  );
  const dispatch = useAppDispatch();
  const [tmpProductStock, setTmpProductStock] = useState<AddProductStock[]>([
    { stockQuantity: null, size: null },
  ]);

  useEffect(() => {
    if (isOpen) {
      setTmpProductStock(
        productStock?.map((stock) => ({
          size: sizes?.find((s) => s?.id === stock?.sizeId),
          stockQuantity: stock?.stockQuantity,
        }))
      );
    }
  }, [isOpen]);

  const handleProductSizesSubmit = () => {
    setProductStock(
      tmpProductStock?.map((tmpStock) => ({
        sizeId: tmpStock?.size?.id,
        stockQuantity: parseInt(tmpStock?.stockQuantity),
      }))
    );
    handleCloseModal();
  };

  const addProductSizeHandler = () => {
    const tmp = [...tmpProductStock];
    tmp.push({ stockQuantity: null, size: null });
    setTmpProductStock(tmp);
  };

  const deleteProductSizeHandler = (index: number) => {
    if (index > -1) {
      const tmp = [...tmpProductStock]?.filter((_, ind) => ind !== index);
      setTmpProductStock(tmp);
    }
  };

  const updateProductSizeElement = (
    type: string,
    value: any,
    index: number
  ) => {
    if (index > -1) {
      let tmp = [...tmpProductStock];
      tmp[index][type] = value;
      setTmpProductStock(tmp);
    }
  };

  const getSizesOptions = () => {
    return sizes?.filter(
      (item) => !tmpProductStock?.some((s) => s?.size?.id === item?.id)
    );
  };

  const handleCloseModal = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={handleCloseModal} disableScrollLock={false}>
      {/* <StyledDialogTitle>{"Create"} Product</StyledDialogTitle> */}
      <FormWrapper
        onSubmit={(e) => {
          e.preventDefault();
          handleProductSizesSubmit();
        }}
      >
        <StyledDialogContent>
          <DialogInstructions>
            Fill in the all the sizes for the new product
          </DialogInstructions>
          {tmpProductStock?.map((stock, index) => (
            <ProductSizeRow key={index}>
              <TextField
                label="Stock quantity"
                type="number"
                value={stock?.stockQuantity || ""}
                onChange={(e) =>
                  updateProductSizeElement(
                    "stockQuantity",
                    e.target.value,
                    index
                  )
                }
                inputProps={{
                  min: 0,
                }}
                required
              />

              <Autocomplete
                options={getSizesOptions() || []}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    {...params}
                    color="secondary"
                    InputLabelProps={{ shrink: true }}
                    label="Sizes"
                    required
                  />
                )}
                value={stock?.size || null}
                onChange={(_, value) =>
                  updateProductSizeElement("size", value, index)
                }
                getOptionLabel={(option, index) =>
                  option?.name?.toString() || ""
                }
              />
              <AddIconButton onClick={addProductSizeHandler}>
                <SizeAddIcon />
              </AddIconButton>
              {tmpProductStock?.length > 1 && (
                <DeleteIconButton
                  onClick={() => deleteProductSizeHandler(index)}
                >
                  <DeleteIcon />
                </DeleteIconButton>
              )}
            </ProductSizeRow>
          ))}
        </StyledDialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="error">
            Cancel
          </Button>
          <CreateProductSizesButton
            color="info"
            type="submit"
            variant="outlined"
          >
            Create
          </CreateProductSizesButton>
        </DialogActions>
      </FormWrapper>
    </Dialog>
  );
};

const FormWrapper = styled("form")`
  gap: 4px;
  width: 500px;
`;

const ProductSizeRow = styled("div")`
  display: grid;
  grid-template-columns: 1fr 1fr 30px 30px;
  align-items: center;
  gap: 10px;
`;

const AddIconButton = styled(IconButton)`
  background: #11998e;
  width: 35px;
  height: 35px;
  :hover {
    background: #11998e;
    opacity: 0.7;
  }
`;

const DeleteIconButton = styled(IconButton)`
  background: #ff6252;
  width: 35px;
  height: 35px;
  :hover {
    background: #ff6252;
    opacity: 0.7;
  }
`;

const SizeAddIcon = styled(AddIcon)`
  color: white;
  width: 22px;
  height: 22px;
`;

const StyledDialogContent = styled(DialogContent)`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const DialogInstructions = styled(DialogContentText)`
  margin-bottom: 15px;
`;

const CreateProductSizesButton = styled(Button)`
  background-color: #202b3c;
  color: white;
  :hover {
    background-color: #202b3c;
    opacity: 0.5;
  }
`;
