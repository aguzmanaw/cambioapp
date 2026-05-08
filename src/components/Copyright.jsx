import Typography from "@mui/material/Typography";

export function Copyright(props) {
  return (
    <Typography
      variant="subtitle2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Desarrollado por "}
      <Typography variant="span">AW Solutions</Typography>
      {" IT 2023."}
    </Typography>
  );
}
