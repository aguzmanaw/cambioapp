import Divider from "@mui/material/Typography";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
//import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import styled from "@emotion/styled";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const StyledDialog = styled(Dialog)(() => ({
  ["& .modal-dialog__title"]: {
    /*padding: 5,*/
    margin: 0,
    textAlign: "center",
  },
  ["& .modalbox-divider___title"]: {
    border: `1px solid #e0e0e0`,
  },
  ["& .modal-dialog__container"]: {
    padding: 6,
  },
}));

export function ModalBox({
  ariaLabelledBy,
  ariaDescribedBy,
  showModal = true,
  title,
  children,
  ...props
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <StyledDialog
        open={showModal}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        fullScreen={fullScreen}
        {...props}
      >
        <Box className="modal-dialog__container">
          <Typography
            className={"modal-dialog__title"}
            variant="h6"
            gutterBottom
          >
            {title}
          </Typography>
          <Divider className={"modalbox-divider___title"} />
          <Box className="modal-dialog__container">{children}</Box>
        </Box>
      </StyledDialog>
    </>
  );
}
