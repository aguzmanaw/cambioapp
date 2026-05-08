import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";

Stack;
export default function NotFound({ url }) {
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={1}
      sx={{
        padding: "8px 16px",
      }}
    >
      <Typography variant="h4" gutterBottom>
        {`¡La página /${url} está en construcción!`}
      </Typography>
    </Stack>
  );
}
