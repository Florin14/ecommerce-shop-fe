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
import {
  SubmitHandler,
  FormProvider,
  useController,
  useForm,
} from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { StyledInput } from "../../StyledInput";
import { BrandResponseDTO } from "../../../../types/brands/Brands";
import { addBrand, updateBrand } from "../../../../store/slices/brands/thunks";

export type CreateBrandType = {
  name: string;
};

interface CreateBrandModalProps {
  isOpen: boolean;
  onClose: () => void;
  brand: BrandResponseDTO | null;
}

export const CreateBrandModal: React.FC<CreateBrandModalProps> = ({
  isOpen,
  onClose,
  brand,
}) => {
  // const userData = useAppSelector(selectUserData)
  // const role = userData?.role
  const dispatch = useAppDispatch();
  const [listOfInterestAreas, setListOfInterestAreas] = useState<string[]>([]);

  const formMethods = useForm<CreateBrandType>();
  const {
    control,
    handleSubmit,
    setValue,
    clearErrors,
    reset,
    formState: { errors },
  } = formMethods;
  // const interestAreasOptions = useAppSelector(selectInterestAreasOptions)
  // const interestAreasOptionsLoading = useAppSelector(selectInterestAreasOptionsLoading)
  const [name, setName] = useState("");

  // const editMode = !!announcement


  const setInterestAreas = () => {
  };

  const getInterestAreaId = (name: string) => {
    // interestAreasOptions?.map(area => {
    //   area.name === name && setInterestAreasId(area.id)
    // })
  };

  // useEffect(() => {
  //   if (!interestAreasOptions) dispatch(fetchInterestAreasOptions())
  //   setInterestAreas()
  // }, [dispatch, interestAreasOptions])

  const handleBrandSubmit: SubmitHandler<CreateBrandType> = async (
    formData
  ) => {
    // getInterestAreaId(formData.interestArea)
    // if (areasId && userData && !editMode) {
    if (name) {
      if (brand) {
        dispatch(updateBrand({ id: brand?.id, name })).then(
          (res) => {
            if (res?.payload) {
              handleCloseModal();
            }
          }
        );
      } else {
        dispatch(addBrand({ name })).then((res) => {
          if (res?.payload) {
            handleCloseModal();
          }
        });
      }
    }

    //   )
  };

  const handleCloseModal = () => {
    onClose();
    setName("");
  };

  useEffect(() => {
    if (isOpen && brand) {
      setName(brand?.name);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onClose={handleCloseModal} disableScrollLock={false}>
      {/* <LoadingOverlay visible={interestAreasOptionsLoading} /> */}
      <StyledDialogTitle>{"Create"} Brand</StyledDialogTitle>
      <FormProvider {...formMethods}>
        <FormWrapper onSubmit={handleSubmit(handleBrandSubmit)}>
          <StyledDialogContent>
            <DialogInstructions>
              Fill in the details for the new brand
            </DialogInstructions>
            <StyledInput
              label="Name"
              fieldName="title"
              value={name || ""}
              options={{
                required: true,
                minLength: {
                  value: 3,
                  message: "Name should be min 3 characters long",
                },
              }}
              onChange={(newTitle) => {
                setName(newTitle.target.value);
              }}
              // error={!!errors.title}
              // helperText={errors.title?.message}
            />
          </StyledDialogContent>
          <DialogActions>
            <CancelBrandButton onClick={handleCloseModal}>
              Cancel
            </CancelBrandButton>
            <CreateBrandButton color="info" type="submit" variant="outlined">
              Create
            </CreateBrandButton>
          </DialogActions>
        </FormWrapper>
      </FormProvider>
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

const CreateBrandButton = styled(Button)`
  background-color: #202b3c;
  color: white;
  :hover {
    background-color: #202b3c;
    opacity: 0.5;
    // border: 0;
  }
`;

const CancelBrandButton = styled(Button)`
  background-color: pink;
  color: white;
  :hover {
    background-color: red;
    opacity: 0.5;
    // border: 0;
  }
`;
