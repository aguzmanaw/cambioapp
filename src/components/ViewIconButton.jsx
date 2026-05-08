import VisibilityIcon from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";

export default function ViewIconButton({ onClick, ...rest }) {
  return (
    <IconButton
      id="delete"
      aria-label="delete"
      color="secondary"
      onClick={onClick}
      {...rest}
    >
      <VisibilityIcon />
    </IconButton>
  );
}
