import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { SearchInput } from "./SearchInput";
import { drawerWidth } from "../utils/constants";

export function Layout({ children }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      component="main"
      sx={{
        overflow: "auto",
        height: "calc(94vh - 50px)",
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        borderRadius: 4,
        backgroundColor: theme.palette.primary.light,
      }}
    >
      {isMobile && <SearchInput value={""} />}
      {children}
    </Box>
  );
}
