import React, { useEffect, useState } from "react";

import {
  styled,
  Tab,
  Typography,
  css,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { PaymentCard } from "../../generic-components/PaymentCard/PaymentCard";
import { RootState } from "../../../store";
import { useSelector } from "react-redux";
import { CategoryResponseDTO } from "../../../types/categories/Categories";
import { BrandResponseDTO } from "../../../types/brands/Brands";
import { getBrands } from "../../../store/slices/brands/thunks";
import { CreateBrandModal } from "../../generic-components/modals/CreateBrandModal";

// export enum AnnouncementCategory {
//   FEED,
//   FOLLOWED,
// }
interface ModalInstance {
  type: string | null;
  item: BrandResponseDTO | null;
  // announcement?: AnnouncementDto
}

const BrandsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  // const [selectedCategory, setSelectedCategory] = useState(
  //   AnnouncementCategory.FEED
  // );

  // const announcementsLoading = useAppSelector(selectAnnouncementsLoading)
  // const announcementsError = useAppSelector(selectAnnouncementsError)
  // const announcementsData = useAppSelector(selectAnnouncementsData)
  // const searchDone = useAppSelector(selectAnnouncementsResultsSuccess)
  const brands = useSelector((state: RootState) => state.brands.brands);
  const [init, setInit] = useState(false);
  // const role = userData?.role
  // const userId = userData?.id

  const [modal, setModal] = useState<ModalInstance>({ type: null, item: null });

  const modalTypes = {
    ADD: "ADD",
    UPDATE: "UPDATE",
  };
  // const shouldOpenCreateAnnouncementModal = role === Role.MENTOR && createAnnouncementOpen
  // const [updatedAnnouncement, setUpdatedAnnouncement] = useState<AnnouncementDto | undefined>(undefined)

  // const handleOpenAnnouncementWhenUpdate = (announcement: AnnouncementDto) => {
  //   setUpdatedAnnouncement(announcement)
  //   setCreateAnnouncementOpen(true)
  // }

  const handleCloseModal = () => {
    setModal({ type: null, item: null });
    // setUpdatedAnnouncement(undefined)
  };

  // // Load announcements data on page load
  useEffect(() => {
    if (!init) {
      dispatch(getBrands({})).then(() => {
        setInit(true);
      });
    }
  }, []);

  // if (announcementsLoading) {
  //   return <Loader fullscreen={true} />
  // }

  // if (announcementsError || !announcementsData) {
  //   return null
  // }

  // const myAnnouncements = announcementsData && [
  //   ...announcementsData.filter(announcement => announcement.user.fullName === userData?.fullName),
  // ]

  // const handleCategorySelection = (_event: React.SyntheticEvent, newSelectedCategory: AnnouncementCategory) => {
  //   setSelectedCategory(newSelectedCategory)
  // }

  // const renderAnnouncements = (announcements?: AnnouncementDto[], categoryIndex?: number) => {
  //   if (announcements?.length && categoryIndex === selectedCategory) {
  //     return (
  //       <Announcements key={categoryIndex} role="tabpanel">
  //         {announcements.map(announcement => (
  //           <AnnouncementCard
  //             key={announcement.id}
  //             id={announcement.id}
  //             title={announcement.title}
  //             description={announcement.description}
  //             price={announcement.price}
  //             createdBy={announcement.user}
  //             interestAreas={announcement.interestAreas}
  //             createdAtDate={announcement.postingDate}
  //             category={selectedCategory}
  //             onUpdateClick={() => handleOpenAnnouncementWhenUpdate(announcement)}
  //           />
  //         ))}
  //       </Announcements>
  //     )
  //   }

  //   if (categoryIndex === selectedCategory) {
  //     return (
  //       <EmptyAnnouncementsText key={categoryIndex} variant="body1">
  //         No announcements here yet
  //       </EmptyAnnouncementsText>
  //     )
  //   }

  //   return null
  // }

  return (
    <Container>
      {/* {searchDone && (
        <Button onClick={() => dispatch(fetchAnnouncements())} color="secondary">
          Back to all announcements
        </Button>
      )} */}
      <Title variant="overline">Brands</Title>

      <CreateBrandButton
        variant="outlined"
        // color="#11998e"
        onClick={() => setModal({ type: modalTypes.ADD, item: null })}
      >
        <AddIcon /> Create Brand
      </CreateBrandButton>

      <Categories>
        {brands &&
          brands?.map((brand: BrandResponseDTO) => (
            <BrandItem key={brand?.id}>
              <ButtonSection>
                <Tooltip title="Editeaza">
                  <EditIconButton
                    onClick={() =>
                      setModal({ type: modalTypes.UPDATE, item: brand })
                    }
                  >
                    <EditIcon />
                  </EditIconButton>
                </Tooltip>
              </ButtonSection>
              <BrandLabel>{brand?.name || ""}</BrandLabel>
            </BrandItem>
          ))}
      </Categories>
      {/* <PaymentCard /> */}

      <CreateBrandModal
        isOpen={
          modal?.type === modalTypes.ADD || modal?.type === modalTypes.UPDATE
        }
        onClose={handleCloseModal}
        brand={modal?.item}
      />
      {/* <Tabs value={selectedCategory} onChange={handleCategorySelection} indicatorColor="secondary">
        <StyledTab label="Feed" aria-selected={AnnouncementCategory.FEED === selectedCategory} />
        {role === Role.MENTOR && (
          <StyledTab label="Your's" aria-selected={AnnouncementCategory.FOLLOWED === selectedCategory} />
        )}
      </Tabs> */}
      {/* {[announcementsData, myAnnouncements].map(renderAnnouncements)} */}
    </Container>
  );
};

export default BrandsPage;

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 20px;
  // padding-top: 60px;
  padding: 60px 20px 20px;
`;

const Title = styled(Typography)`
  font-weight: 600;
  font-size: 24px;
`;

const Categories = styled("div")`
  display: grid;
  gap: 20px;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  overflow: auto;
`;

const BrandItem = styled("div")`
  // background-color: yellow;
  background: linear-gradient(to top, #11998e, #38ef7d) padding-box;
  min-width: 200px;
  padding: 20px;
  color: blue;
  height: 300px;
  border-radius: 10px;
`;

const BrandLabel = styled(Typography)`
  font-size: 14px;
  font-weight: 600;
  color: #202b3c;
`;

const StyledTab = styled(Tab)`
  ${(props) =>
    props["aria-selected"] &&
    css`
      color: ${props.theme.palette.secondary.main} !important;
    `}
`;

const CreateBrandButton = styled(Button)`
  padding: 30px;
  width: 500px;
  display: flex;
  gap: 5px;
  font-size: 16px;
  color: #11998e;
  border: 1px solid #11998e;
`;

const EditIconButton = styled(IconButton)`
  background-color: #202b3c;
  color: white;
  :hover {
    background-color: #202b3c;
    color: white;
    opacity: 0.5;
    // color: yellow;
  }
`;

const ButtonSection = styled("div")`
  display: flex;
  justify-content: end;
`;

Container.displayName = "Brands Page";

export { Container };
