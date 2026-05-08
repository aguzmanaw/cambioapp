import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "wouter";
import { Profile } from "./Auth/Profile";
import logo from "@/assets/logo.svg";

export default function Header({ username, onClick, onSignOut }) {
  return (
    <Box
      sx={{
        flexGrow: 1,
      }}
    >
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          "& a.header__logo": {
            textDecoration: "none",
            color: "white",
          },
          "& a.header__logo img": {
            marginTop: 1,
            height: 50,
          },
          "& a.header__logo:visited": {
            textDecoration: "none",
            color: "white",
          },
          "& a.header__logo:hover": {
            textDecoration: "none",
            color: "white",
          },
          "& a.header__logo:active": {
            textDecoration: "none",
            color: "white",
          },
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, marginRight: 1 }}
            onClick={onClick}
          >
            <MenuIcon />
          </IconButton>
          <Link href="/dashboard">
            <a className="header__logo">
              <img src={logo} />
            </a>
          </Link>
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              width: "100%",
            }}
          >
            <Profile firstname={username} onSignOut={onSignOut} />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
