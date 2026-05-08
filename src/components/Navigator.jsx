import Toolbar from "@mui/material/Toolbar";
import Drawer from "@mui/material/Drawer";
import { Menu } from "./Menu";
import { drawerWidth } from "../utils/constants";
import { Box } from "@mui/material";

export default function Navigator({ routes, open }) {
  return (
    <Box component="aside">
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          display: !open ? "block" : "none",
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "rgb(13.3, 13.3, 13.3)",
          },
        }}
      >
        <Toolbar />
        <Menu routes={routes} />
      </Drawer>
      <Toolbar />
    </Box>
  );
}
