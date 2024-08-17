import React, { useState, useEffect } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
// import { useRouter } from "next/router";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import "./AquabisSidebar.css";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Drawer,
  Hidden,
  Icon,
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
  Popper,
  ClickAwayListener,
  Grow,
  Paper,
  MenuList,
  MenuItem,
} from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { adminRoutes } from "../../../utils/app-utils/adminRoutes";
import Logout from "@mui/icons-material/Logout";

export const AquabisSidebar = (props: any) => {
  const router = useNavigate();
  const location = useLocation();

  const [name, setName] = useState("");
  const [accountNameInitials, setAccountNameInitials] = useState("");
  const [openProfile, setOpenProfile] = useState(null);
  const [mobileDevice, setMobileDevice] = useState(false);

  useEffect(() => {
    const userName = "Florin";
    if (userName !== undefined && userName !== null) {
      const nameItems = userName.split(" ");
      setName(userName);
      setAccountNameInitials(
        nameItems[0]
          ? nameItems[0][0] + (nameItems[1] ? nameItems[1][0] : " ")
          : ""
      );
    }
  }, []);

  const handleClickProfile = (event: any) => {
    if (openProfile) {
      setOpenProfile(null);
    } else {
      setOpenProfile(event.currentTarget);
    }
  };

  const handleCloseProfile = () => {
    setOpenProfile(null);
  };

  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName: any) {
    return routeName === location.pathname;
  }

  const handleResize = () => {
    setMobileDevice(window?.innerWidth < 960);
    if (window?.innerWidth >= 960 && props.open) {
      props.handleDrawerToggle();
    }
  };

  useEffect(() => {
    setMobileDevice(window?.innerWidth < 960);
  }, []);

  window.addEventListener("resize", handleResize);

  // function includeRoute(routeName: any) {
  //   return router.name.includes(routeName);
  // }

  const renderRoutes = (routesToRender: any, device: any, level = 0) => {
    return (
      <List className="list">
        {routesToRender
          .filter((route: any) => route.isOnMenu)
          .map((route: any, key: any) => {
            var listItemClasses;

            listItemClasses = classNames({
              [" " + "activeRoute"]: activeRoute(route.path),
            });

            const whiteFontClasses = classNames({
              ["selectedItemIcon" + " " + "whiteFont"]: activeRoute(route.path),
            });

            const hasChildren = route?.children && route?.children?.length > 0;

            return (
              <React.Fragment key={key}>
                {hasChildren ? (
                  <Accordion
                    key={key}
                    elevation={0}
                    className={"accordionWrapper"}
                    classes={{
                      root: "accordionRoot",
                    }}
                  >
                    <AccordionSummary
                      expandIcon={
                        <ExpandMoreIcon
                          className={classNames("expandItemIcon", {
                            [" " + "whiteFont"]: activeRoute(route.path),
                          })}
                        />
                      }
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      className={"accordionHeader"}
                      classes={{ root: "accordionHeaderContent" }}
                    >
                      <div
                        className={"settingsElement"}
                        style={{
                          paddingLeft:
                            level > 1 ? (level - 1) * 20 + "px" : undefined,
                        }}
                      >
                        <route.icon
                          className={classNames("itemIcon", whiteFontClasses, {
                            [" " + "whiteFont"]: activeRoute(route.path),
                          })}
                        />
                        <Typography
                          className={classNames("settingsItemText", {
                            [" " + "whiteFont"]: activeRoute(route.path),
                          })}
                        >
                          {route.name}
                        </Typography>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails classes={{ root: "accountDetails" }}>
                      {renderRoutes(route.children, device, level + 1)}
                    </AccordionDetails>
                  </Accordion>
                ) : (
                  <Link
                    to={route.path}
                    className={"item" + listItemClasses}
                    key={key}
                  >
                    <div
                      key={key}
                      onClick={() =>
                        device === "mobile" && props.handleDrawerToggle()
                      }
                      // style={{
                      //   paddingLeft:
                      //     level > 1 ? (level - 1) * 20 + "px" : undefined,
                      // }}
                    >
                      <ListItem
                        button
                        className={classNames("itemLink", {
                          ["whiteFont"]: activeRoute(route.path),
                        })}
                      >
                        {typeof route.icon === "string" ? (
                          <Icon
                            className={classNames("itemIcon", whiteFontClasses)}
                          >
                            {route.icon}
                          </Icon>
                        ) : (
                          <route.icon
                            className={classNames("itemIcon", whiteFontClasses)}
                          />
                        )}
                        <ListItemText
                          primary={route.name}
                          className={classNames("itemText", whiteFontClasses)}
                          disableTypography={true}
                        />
                        {route?.label !== null && <route.label />}
                      </ListItem>
                    </div>
                  </Link>
                )}
              </React.Fragment>
            );
          })}
      </List>
    );
  };

  const linksRecursive = (device: any) => {
    return renderRoutes(adminRoutes, device);
  };

  const handleLogout = () => {};

  var profile = (
    <div className={"profile"}>
      <div className={"accountIcon"}>
        <p className={"accountNameInitials"}>{accountNameInitials}</p>
      </div>
      <Button
        aria-owns={openProfile ? "profile-menu-list-grow" : null}
        aria-haspopup="true"
        onClick={handleClickProfile}
        classes={{ root: "accountButtonWrapper" }}
      >
        <div className={"nameAndIcon"}>
          <p className={"nameText"}>{name?.toLowerCase()}</p>
          {openProfile ? (
            <ExpandLessIcon className={"expandItemIcon"} />
          ) : (
            <ExpandMoreIcon className={"expandItemIcon"} />
          )}
        </div>
      </Button>
      <p className={"roleText"}>Rol</p>
      <Popper
        style={{ width: "100%" }}
        open={Boolean(openProfile)}
        anchorEl={openProfile}
        transition
        disablePortal
        className={classNames({ ["popperClose"]: !openProfile })}
      >
        {({ TransitionProps, placement }) => (
          <ClickAwayListener onClickAway={handleCloseProfile}>
            <Grow
              {...TransitionProps}
              id="profile-menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper style={{ boxShadow: "none" }}>
                <MenuList role="menu" className={"menuList"}>
                  {/*<MenuItem*/}
                  {/*    onClick={() => {*/}
                  {/*        router.push("/dashboard/user/profile").then((_) => {*/}
                  {/*            handleCloseProfile();*/}
                  {/*        });*/}
                  {/*    }}*/}
                  {/*    className={classes.dropdownItem}*/}
                  {/*>*/}
                  {/*    <PersonOutlinedIcon className={classes.accountDropdownIcon} />*/}
                  {/*    <div>{languageData?.MyProfile}</div>*/}
                  {/*</MenuItem>*/}
                  <MenuItem
                    onClick={() => {
                      router("/dashboard/user/change-password");

                      handleCloseProfile();
                    }}
                    className={"dropdownItem"}
                  >
                    <LockOutlinedIcon className={classNames("itemIcon")} />
                    <div className={classNames("settingsItemText")}>
                      Schimba parola
                    </div>
                  </MenuItem>
                  <MenuItem onClick={handleLogout} className={"dropdownItem"}>
                    <ExitToAppIcon className={classNames("itemIcon")} />
                    <div className={classNames("settingsItemText")}>Logout</div>
                  </MenuItem>
                </MenuList>
              </Paper>
            </Grow>
          </ClickAwayListener>
        )}
      </Popper>
    </div>
  );

  const createdBy = (
    <div className={"createdByWrapper"}>
      {/* <div className={"createdByLabel"}>SoftwareBy</div> */}
      <ListItem
        button
        className={classNames("itemLink", {
          ["selectedLink"]: activeRoute("/admin/settings"),
        })}
      >
        <SettingsIcon className="footer_icon" />
        <ListItemText
          primary={"Settings"}
          className={classNames("itemText", {
            ["selectedItemIcon" + " " + "whiteFont"]:
              activeRoute("/admin/settings"),
          })}
          disableTypography={true}
        />
      </ListItem>
      {/* <div className="sidebar_footer">
        <SettingsIcon className="footer_icon" />
        <Link to="https://www.cicadatech.eu/" target="_blank" rel="noreferrer">
          Settings
        </Link>
      </div> */}
      <div className="sidebar_footer">
        <Logout className="footer_icon" />
        <Link to="https://www.cicadatech.eu/" target="_blank" rel="noreferrer">
          Log out
        </Link>
      </div>
    </div>
  );

  return (
    <div>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={"left"}
          open={props.open}
          classes={{
            paper: "drawerPaper",
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {profile}
          <div
            className={"sidebarWrapper"}
            style={{ minHeight: props.menuMinHeight }}
          >
            {/*<ProfileDropdown />*/}
            {mobileDevice && linksRecursive("mobile")}
          </div>
          {createdBy}
        </Drawer>
      </Hidden>
      <Hidden mdDown implementation="css">
        <Drawer
          anchor={"left"}
          variant="permanent"
          open
          classes={{
            paper: "drawerPaper",
          }}
        >
          {profile}
          <div
            className={"sidebarWrapper"}
            style={{ minHeight: props.menuMinHeight }}
          >
            {!mobileDevice && linksRecursive("")}
          </div>
          {createdBy}
        </Drawer>
      </Hidden>
    </div>
  );
}

AquabisSidebar.propTypes = {
  handleDrawerToggle: PropTypes.func,
  open: PropTypes.bool,
  menuMinHeight: PropTypes.number,
};
