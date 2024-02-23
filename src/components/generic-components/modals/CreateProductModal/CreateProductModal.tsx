import {
  Autocomplete,
  Box,
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
import {
  SubmitHandler,
  FormProvider,
  useController,
  useForm,
} from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { StyledInput } from "../../StyledInput";
import {
  addProducts,
  getProductsResources,
} from "../../../../store/slices/products/thunks";
import { RootState } from "../../../../store";
import { BrandResponseDTO } from "../../../../types/brands/Brands";
import { CategoryResponseDTO } from "../../../../types/categories/Categories";
import { GenderResponseDTO } from "../../../../types/genders/Genders";
import { ImageUploadComponent } from "../../ImageUploadComponent/ImageUploadComponent";
// import { Role } from '../../../types/User'
// import { FormInput } from '../../common/FormInput'
// import { AnnouncementDto } from '../../../types/Announcements'
// import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
// import { selectInterestAreasOptions, selectInterestAreasOptionsLoading, selectUserData } from '../../account/selectors'
// import { fetchInterestAreasOptions } from '../../account/actions'
// import { LoadingOverlay } from '../../common/LoadingOverlay'
// import { addAnnouncement, updateAnnouncement } from '../actions'

export type CreateProductType = {
  id: number;
  title: string;
  interestArea: string;
  description: string;
  price: number;
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
  // const role = userData?.role
  const dispatch = useAppDispatch();
  const [brand, setBrand] = useState<BrandResponseDTO | null>(null);
  const [category, setCategory] = useState<CategoryResponseDTO | null>(null);
  const [gender, setGender] = useState<GenderResponseDTO | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [sku, setSKU] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [price, setPrice] = useState<number | null>(null);
  const [stockQuantity, setStockQuantity] = useState<number | null>(0);
  const [productImage, setProductImage] = useState<File | null>(null);

  useEffect(() => {
    if (isOpen) dispatch(getProductsResources({}));
  }, [isOpen]);

  const handleProductSubmit: SubmitHandler<CreateProductType> = async () => {
    dispatch(
      addProducts({
        name,
        sku,
        description,
        price,
        stockQuantity,
        brandId: brand?.id,
        categoryId: category?.id,
        genderId: gender?.id,
      })
    );
  };

  const handleImagesUploaded = (images: File[]) => {
    console.log(images);
  };

  const handleCloseModal = () => {
    onClose();
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
          {/* <StyledInput
            label="Name"
            fieldName="name"
            options={{
              required: true,
              minLength: {
                value: 3,
                message: "Name should be min 3 characters long",
              },
            }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            label="Price"
            name="price"
            size="small"
            color="secondary"
            type="number"
            value={price || ""}
            onChange={(e) => setPrice(Number(e.target.value))}
          />

          <TextField
            label="Stock quantity"
            name="stockQuantity"
            size="small"
            color="secondary"
            type="number"
            value={stockQuantity || 0}
            onChange={(e) => setStockQuantity(Number(e.target.value))}
          />

          <Autocomplete
            options={brands || []}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                color="secondary"
                InputLabelProps={{ shrink: true }}
                label="Brand"
              />
            )}
            value={brand}
            onChange={(_, b) => setBrand(b)}
            getOptionLabel={(option) => option?.name?.toString() || ""}
          /> */}

          {/* Repeat the above structure for Category and Gender Autocomplete */}

          {/* <StyledInput
            label="Description"
            fieldName="description"
            options={{ maxLength: 200, required: true }}
            helperText="Max 200 characters"
            value={description || ""}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={3}
          />

          <StyledInput
            label="SKU"
            fieldName="sku"
            options={{ maxLength: 200, required: true }}
            value={sku || ""}
            onChange={(e) => setSKU(e.target.value)}
            multiline
          /> */}

          <TextField
            label="Name"
            value={name || ""}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            label="Price"
            type="number"
            value={price || ""}
            onChange={(e) => setPrice(Number(e.target.value))}
          />

          <TextField
            label="Stock quantity"
            type="number"
            value={stockQuantity || ""}
            onChange={(e) => setStockQuantity(Number(e.target.value))}
          />

          <Autocomplete
            options={brands || []}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                color="secondary"
                InputLabelProps={{ shrink: true }}
                label="Brand"
              />
            )}
            value={brand}
            onChange={(_, b) => setBrand(b)}
            getOptionLabel={(option) => option?.name?.toString() || ""}
          />

          <TextField
            label="Description"
            value={description || ""}
            onChange={(e) => setDescription(e.target.value)}
          />

          <TextField
            label="SKU"
            type="number"
            value={sku || ""}
            onChange={(e) => setSKU(e.target.value)}
          />

          <ImageUploadComponent onImagesUploaded={handleImagesUploaded} />
        </StyledDialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="error">
            Cancel
          </Button>
          <CreateProductButton color="info" type="submit" variant="outlined">
            Create
          </CreateProductButton>
        </DialogActions>
      </FormWrapper>
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
