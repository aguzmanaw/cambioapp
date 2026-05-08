import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

const StyledBox = styled(Box)(() => ({
  ["& .order-card__title"]: {
    textAlign: "center",
    paddingTop: 8,
    margin: 0,
  },
  ["& .order-card__print"]: {
    minWidth: 320,
  },
  ["& .order-card__print-data"]: {
    /*padding: "8px 8px 8px 8px",*/
  },
  ["& .order-card__print-cover"]: {
    position: "absolute",
    left: 0,
    top: 40,
    zIndex: 1,
    border: "1px solid red",
  },
}));

export function OrderPrintCard({ title, draft, text, children }) {
  return (
    <StyledBox>
      {title && (
        <Typography className={"order-card__title"} variant="h6" gutterBottom>
          {title}
        </Typography>
      )}
      {draft && <Box className="order-card__print-cover"></Box>}
      <Box className="order-card__print">
        <TextField
          className="order-card__print-data"
          fullWidth
          readOnly
          color="warning"
          multiline
          rows={7}
          value={text}
        />
      </Box>
      {children}
    </StyledBox>
  );
}
