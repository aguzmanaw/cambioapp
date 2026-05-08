import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import PasswordInput from "./PasswordInput";
import { Copyright } from "./Copyright";
import logo from "@/assets/logo.svg";

const styles = {
  dialog: {
    backgroundColor: "primary.dark",
    "& .MuiDialog-paper": {
      borderRadius: 4,
      maxWidth: "400px",
    },
    "& .MuiModal-backdrop": {
      backgroundColor: "transparent",
    },
  },
};

function Welcome(props) {
  return (
    <Typography
      variant="subtitle2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Bienvenido al "}
      <Typography variant="span" color="text.primary">
        {"Centro de operaciones de ArCambio."}
      </Typography>
    </Typography>
  );
}

export default function LoginPage({ message, onSubmit }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={true}
        aria-labelledby="login"
        sx={{ ...styles.dialog }}
      >
        <DialogTitle>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: 2,
            }}
          >
            <img src={logo} width="130px" alt="ArCambio App" />
          </Box>
        </DialogTitle>
        <Welcome />
        <DialogContent>
          <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              required
              fullWidth
              id="username"
              label="Correo"
              name="username"
              autoComplete="username"
              defaultValue={"root@arcambio.com"}
              autoFocus
            />
            <PasswordInput defaultValue={"Nueva123"} />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Inicio de Sesión
            </Button>
          </Box>
          <Typography variant="subtitle2" color="text.secondary" align="center">
            {message && <>{message}</>}
          </Typography>
        </DialogContent>
        <Copyright sx={{ mt: 1, mb: 4 }} />
      </Dialog>
    </>
  );
}
