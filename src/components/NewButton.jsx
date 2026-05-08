import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddBoxIcon from "@mui/icons-material/AddBox";

export function NewButton({ onClick, label, ...props }) {
  return (
    <Box sx={{ "& button": { m: 1 } }}>
      <Button
        size="medium"
        variant="contained"
        startIcon={<AddBoxIcon />}
        onClick={onClick}
        {...props}
      >
        {label ?? "Nuevo"}
      </Button>
    </Box>
  );
}
