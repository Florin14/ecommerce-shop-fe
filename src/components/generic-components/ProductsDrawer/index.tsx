import { Box, Drawer } from "@mui/material";
import { ProductsSortSelect } from "../ProductsSortSelect";
import { FilterButton } from "../FilterButton";
import { SimpleListMenu } from "../SingleSelect";

export const ProductsDrawer = ({ toggleDrawer, isOpen }) => {
  return (
    <Drawer anchor="top" open={isOpen} onClose={toggleDrawer(false)}>
      <Box
        sx={{
          width: "auto",
          display: "flex",
          height: "50vh",
          justifyContent: "center",
          alignItems: "center",
        }}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <div style={{ display: "flex", gap: 20 }}>
          {/* <ProductsSortSelect /> */}
          <FilterButton />
          <SimpleListMenu />
        </div>
        {/* <List>
            {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider orientation="orizontal"/>
          <List>
            {["All mail", "Trash", "Spam"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List> */}
      </Box>
    </Drawer>
  );
};
