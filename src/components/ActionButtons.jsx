import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export function ActionButtons({
  applyLabel,
  closeLabel,
  onClose,
  className,
  ...props
}) {
  return (
    <Stack
      className={className}
      direction="row"
      justifyContent="right"
      alignItems="center"
      spacing={1}
      sx={{
        padding: "8px 8px 8px 0",
        "& 	.MuiButton-root:invalid": {
          backgroundColor: "green",
        },
      }}
      {...props}
    >
      {closeLabel && (
        <Button
          sx={{
            width: 110,
          }}
          id="cancelBtn"
          color="secondary"
          variant="contained"
          type="reset"
          onClick={onClose}
        >
          {closeLabel}
        </Button>
      )}
      {applyLabel && (
        <Button
          sx={{
            width: 110,
          }}
          id="applyBtn"
          variant="contained"
          type="submit"
        >
          {applyLabel}
        </Button>
      )}
    </Stack>
  );
}
