import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

export default function DeleteIconButton({ onClick, ...rest }) {
  return (
    <IconButton
      id="delete"
      aria-label="delete"
      color="secondary"
      size="small"
      onClick={onClick}
      {...rest}
    >
      <DeleteIcon />
    </IconButton>
  );
}
