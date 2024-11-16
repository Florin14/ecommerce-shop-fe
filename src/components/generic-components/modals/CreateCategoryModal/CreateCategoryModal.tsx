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
import {
  addCategory,
  updateCategory,
} from "../../../../store/slices/categories/thunks";
import { CategoryResponseDTO } from "../../../../types/categories/Categories";

export type CreateCategoryType = {
  name: string;
};

interface CreateCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: CategoryResponseDTO | null;
  // announcement?: AnnouncementDto
}

export const CreateCategoryModal: React.FC<CreateCategoryModalProps> = ({
  isOpen,
  onClose,
  category,
}) => {
  // const userData = useAppSelector(selectUserData)
  // const role = userData?.role
  const dispatch = useAppDispatch();
  const [listOfInterestAreas, setListOfInterestAreas] = useState<string[]>([]);

  const formMethods = useForm<CreateCategoryType>();
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

  // const { field: title } = useController({ name: "title", control });
  // const { field: price } = useController({ name: "price", control });
  // const { field: interestArea } = useController({
  //   name: "interestArea",
  //   control,
  // });
  // const { field: description } = useController({
  //   name: "description",
  //   control,
  //   rules: { required: true },
  // });

  // const editMode = !!announcement

  // useEffect(() => {
  //   // Fill with pre-existing data when updating
  //   if (announcement) {
  //     setValue('title', announcement.title)
  //     setValue('price', announcement.price)
  //     setValue('interestArea', announcement.interestAreas.name)
  //     setValue('description', announcement.description)
  //   }
  // }, [announcement])

  const setInterestAreas = () => {
    // const interestAreaNames: string[] = []
    // interestAreasOptions?.map(interestArea => {
    //   interestAreaNames.push(interestArea.name)
    // })
    // interestAreaNames && setListOfInterestAreas(interestAreaNames)
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

  const handleCategorySubmit: SubmitHandler<CreateCategoryType> = async (
    formData
  ) => {
    // getInterestAreaId(formData.interestArea)
    // if (areasId && userData && !editMode) {
    if (name) {
      if (category) {
        dispatch(updateCategory({ id: category?.id, name })).then(
          (res) => {
            if (res?.payload) {
              handleCloseModal();
            }
          }
        );
      } else {
        dispatch(addCategory({ name })).then((res) => {
          if (res?.payload) {
            handleCloseModal();
          }
        });
      }
    }

    //   )
  };

  // if (areasId && userData && editMode) {
  //   dispatch(
  //     updateAnnouncement({
  //       id: announcement.id,
  //       interestAreasId: areasId,
  //       userId: userData?.id,
  //       title: formData.title,
  //       price: formData.price,
  //       description: formData.description,
  //     })
  //   )
  // }
  // handleClose()
  // }

  const handleCloseModal = () => {
    onClose();
    setName("");
  };

  useEffect(() => {
    if (isOpen && category) {
      setName(category?.name);
    }
  }, [isOpen]);

  // Shouldn't be the case; just making sure
  // if (role !== Role.MENTOR) return null

  return (
    <Dialog open={isOpen} onClose={handleCloseModal} disableScrollLock={false}>
      {/* <LoadingOverlay visible={interestAreasOptionsLoading} /> */}
      <StyledDialogTitle>{"Create"} Category</StyledDialogTitle>
      <FormProvider {...formMethods}>
        <FormWrapper onSubmit={handleSubmit(handleCategorySubmit)}>
          <StyledDialogContent>
            <DialogInstructions>
              Fill in the details for the new category
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
            <CancelCategoryButton onClick={handleCloseModal}>
              Cancel
            </CancelCategoryButton>
            <CreateCategoryButton color="info" type="submit" variant="outlined">
              Create
            </CreateCategoryButton>
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

const CreateCategoryButton = styled(Button)`
  background-color: #202b3c;
  color: white;
  :hover {
    background-color: #202b3c;
    opacity: 0.5;
    // border: 0;
  }
`;

const CancelCategoryButton = styled(Button)`
  background-color: pink;
  color: white;
  :hover {
    background-color: red;
    opacity: 0.5;
    // border: 0;
  }
`;
