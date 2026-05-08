import SaveIcon from "@mui/icons-material/Save";
import IconButton from "@mui/material/IconButton";

export default function EditIconButton({ onClick, ...rest }) {
  return (
    <IconButton
      id="delete"
      aria-label="delete"
      color="secondary"
      onClick={onClick}
      {...rest}
    >
      <SaveIcon />
    </IconButton>
  );
}
