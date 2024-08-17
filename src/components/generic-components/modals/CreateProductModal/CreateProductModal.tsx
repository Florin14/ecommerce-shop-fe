import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  styled,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { StyledInput } from "../../StyledInput";
import AddIcon from "@mui/icons-material/Add";
import {
  addProducts,
  getProducts,
  getProductsResources,
} from "../../../../store/slices/products/thunks";
import { RootState } from "../../../../store";
import { BrandResponseDTO } from "../../../../types/brands/Brands";
import { CategoryResponseDTO } from "../../../../types/categories/Categories";
import { GenderResponseDTO } from "../../../../types/genders/Genders";
import { ImageUploadComponent } from "../../ImageUploadComponent/ImageUploadComponent";
import { CreateProductStockSizesModal } from "../CreateProductStockSizesModal";

export type CreateProductType = {
  id: number;
  title: string;
  interestArea: string;
  description: string;
  price: number;
};

export type AddProductStock = {
  sizeId: number | null;
  stockQuantity: number | null;
};

interface CreateAnnouncementModalProps {
  isOpen: boolean;
  onClose: () => void;
  // announcement?: AnnouncementDto
}

export const CreateProductModal: React.FC<CreateAnnouncementModalProps> = ({
  isOpen,
  onClose,
}) => {
  const brands = useAppSelector(
    (state: RootState) => state.products.resources.brands
  );
  const categories = useAppSelector(
    (state: RootState) => state.products.resources.categories
  );

  const genders = useAppSelector(
    (state: RootState) => state.products.resources.genders
  );

  const sizes = useAppSelector(
    (state: RootState) => state.products.resources.productSizes
  );

  const dispatch = useAppDispatch();
  const [brand, setBrand] = useState<BrandResponseDTO | null>(null);
  const [category, setCategory] = useState<CategoryResponseDTO | null>(null);
  const [gender, setGender] = useState<GenderResponseDTO | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [sku, setSKU] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [price, setPrice] = useState<number | null>(null);
  const [productImages, setProductImages] = useState<File[] | []>([]);
  const [stockIsOpen, setStockIsOpen] = useState(false);
  const [productStock, setProductStock] = useState<AddProductStock[]>([
    { stockQuantity: null, sizeId: null },
  ]);
  const handleCloseCreateProductSizes = () => {
    setStockIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) dispatch(getProductsResources({}));
  }, [isOpen]);

  const handleProductSubmit = () => {
    dispatch(
      addProducts({
        name,
        sku,
        description,
        price,
        brandId: brand?.id,
        categoryId: category?.id,
        genderId: gender?.id,
        images: productImages,
        productStock: productStock?.map((sto) => ({
          sizeId: sto?.sizeId,
          stockQuantity: parseInt(sto?.stockQuantity),
        })),
      })
    ).then((res) => {
      if (!res?.payload?.error) {
        handleCloseModal();
        dispatch(getProducts({}))
      }
    });
  };

  const handleImagesUploaded = (images) => {
    setProductImages(images);
  };

  const handleCloseModal = () => {
    onClose();
    setBrand(null);
    setCategory(null);
    setGender(null);
    setName(null);
    setSKU(null);
    setDescription(null);
    setPrice(null);
    setProductImages([]);
    setStockIsOpen(false);
    setProductStock([{ stockQuantity: null, sizeId: null }]);
  };

  return (
    <Dialog open={isOpen} onClose={handleCloseModal} disableScrollLock={false}>
      <StyledDialogTitle>{"Create"} Product</StyledDialogTitle>
      <FormWrapper
        onSubmit={(e) => {
          e.preventDefault();
          handleProductSubmit();
        }}
      >
        <StyledDialogContent>
          <DialogInstructions>
            Fill in the details for the new product
          </DialogInstructions>
          <TextField
            required
            label="Name"
            value={name || ""}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            required
            label="Price"
            type="number"
            value={price || ""}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
          {productStock?.filter(
            (stock) => stock?.sizeId !== null && stock?.stockQuantity !== null
          )?.length > 0 && (
            <StocksSection>
              {productStock?.map((size) => (
                <div>
                  {
                    sizes?.find((stockSize) => stockSize?.id === size?.sizeId)
                      ?.name
                  }{" "}
                  {">"} {size?.stockQuantity}
                </div>
              ))}
            </StocksSection>
          )}
          <CreateStockButton
            variant="outlined"
            color="secondary"
            onClick={() => setStockIsOpen(true)}
          >
            <AddIcon /> Stock quantity
          </CreateStockButton>

          <Autocomplete
            options={brands || []}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                color="secondary"
                InputLabelProps={{ shrink: true }}
                label="Brand"
                required
              />
            )}
            value={brand}
            onChange={(_, b) => setBrand(b)}
            getOptionLabel={(option) => option?.name?.toString() || ""}
          />

          <Autocomplete
            options={categories || []}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                color="secondary"
                InputLabelProps={{ shrink: true }}
                label="Category"
                required
              />
            )}
            value={category}
            onChange={(_, c) => setCategory(c)}
            getOptionLabel={(option) => option?.name?.toString() || ""}
          />
          <Autocomplete
            options={genders || []}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                color="secondary"
                InputLabelProps={{ shrink: true }}
                label="Gender"
                required
              />
            )}
            value={gender}
            onChange={(_, g) => setGender(g)}
            getOptionLabel={(option) => option?.name?.toString() || ""}
          />

          <TextField
            label="Description"
            value={description || ""}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <TextField
            label="SKU"
            type="number"
            value={sku || ""}
            onChange={(e) => setSKU(e.target.value)}
          />

          <ImageUploadComponent
            onImagesUploaded={handleImagesUploaded}
            required
          />
        </StyledDialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="error">
            Cancel
          </Button>
          <CreateProductButton
            color="info"
            type="submit"
            variant="outlined"
            disabled={
              !productStock?.filter(
                (stock) =>
                  stock?.sizeId !== null && stock?.stockQuantity !== null
              )?.length > 0
            }
          >
            Create
          </CreateProductButton>
        </DialogActions>
      </FormWrapper>
      <CreateProductStockSizesModal
        isOpen={stockIsOpen}
        onClose={handleCloseCreateProductSizes}
        productStock={productStock}
        setProductStock={setProductStock}
      />
    </Dialog>
  );
};

const FormWrapper = styled("form")`
  gap: 4px;
  width: 500px;
`;

const StyledDialogTitle = styled(DialogTitle)`
  background: #ddd;
`;

const StyledDialogContent = styled(DialogContent)`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const DialogInstructions = styled(DialogContentText)`
  margin-bottom: 15px;
`;

const CreateProductButton = styled(Button)`
  background-color: #202b3c;
  color: white;
  :hover {
    background-color: #202b3c;
    opacity: 0.5;
    // border: 0;
  }
`;

const CreateStockButton = styled(Button)`
  padding: 30px;
  width: 100%;
  display: flex;
  gap: 5px;
  font-size: 14px;
`;

const StocksSection = styled("div")`
  width: 100%;
`;
