import React from "react";
import { matchPath, useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import {
  alpha,
  css,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ScheduleIcon from "@mui/icons-material/Schedule";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { websiteActions } from "../../../store/slices/website/website-slice";
import { RootState } from "../../../store";

export const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const activeItem = (itemPath: string) => {
    return !!matchPath(itemPath, pathname);
  };

  const sidebarExpanded = useAppSelector(
    (state: RootState) => state.website.sidebarExpanded
  );

  return (
    <Container>
      <ExpandableList expanded={sidebarExpanded}>
        <CustomListItem
          onClick={() => {
            dispatch(websiteActions.toggleSidebar());
          }}
        >
          <ListItemIcon>
            <MenuIcon />
          </ListItemIcon>
        </CustomListItem>
        <CustomListItem
          selected={activeItem("/")}
          onClick={() => navigate("/")}
        >
          <ListItemIcon>
            <NewspaperIcon />
          </ListItemIcon>
          <ListItemText primary="Announcements" />
        </CustomListItem>
        <CustomListItem
          selected={activeItem("/")}
          onClick={() => navigate("/")}
        >
          <ListItemIcon>
            <AccountBoxIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </CustomListItem>
        <CustomListItem>
          <ListItemIcon>
            <ScheduleIcon />
          </ListItemIcon>
          <ListItemText primary="Appointments" />
        </CustomListItem>
        <CustomListItem
          selected={activeItem("/")}
          onClick={() => navigate("/")}
        >
          <ListItemIcon>
            <NoteAltIcon />
          </ListItemIcon>
          <ListItemText primary="Assignments" />
        </CustomListItem>
      </ExpandableList>
    </Container>
  );
};

const Container = styled("div")`
  position: fixed;
  background: transparent;
  left: 0;
  top: 60px;
  height: 100%;
`;

const ExpandableList = styled(List, {
  shouldForwardProp: (prop) => prop !== "expanded",
})<{ expanded?: boolean }>`
  transition: all 0.15s ease-in-out;
  overflow: hidden;

  width: ${(props) => (props.expanded ? "300px" : "55px")};

  box-shadow: 0px 0px 10px 0px rgba(100, 100, 111, 0.2);
  
`;

const CustomListItem = styled(ListItemButton)`
  ${(props) =>
    props.selected &&
    css`
      background: ${alpha(props.theme.palette.secondary.light, 0.2)} !important;
    `}
`;
