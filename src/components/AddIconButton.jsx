import AddCircleIcon from "@mui/icons-material/AddCircle";
import IconButton from "@mui/material/IconButton";

export default function AddIconButton({ onSubmit, onClick, ...rest }) {
  return (
    <IconButton
      id="add"
      aria-label="add"
      color="primary"
      onClick={onClick}
      onSubmit={onSubmit}
      {...rest}
      sx={{
        padding: 0,
      }}
    >
      <AddCircleIcon />
    </IconButton>
  );
}
