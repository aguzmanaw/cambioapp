import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

export default function AddGroupButton({ onClick, label, ...props }) {
  return (
    <Box sx={{ "& button": { m: 1 } }}>
      <Button
        size="medium"
        variant="contained"
        startIcon={<StarOutlineIcon />}
        onClick={onClick}
        {...props}
      >
        {label ?? "Nuevo"}
      </Button>
    </Box>
  );
}
