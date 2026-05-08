import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useTheme } from "@emotion/react";

export function IndicatorCard({ icon, title = "Indicator", amount = 0 }) {
  const theme = useTheme();
  return (
    <Card>
      <CardContent
        sx={{
          width: "100%",
          height: 160,
          display: "flex",
          direction: "column",
          alignItems: "center",
        }}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              direction: "column",
            }}
          >
            <Box
              sx={{
                backgroundColor: theme.palette.primary.light,
                color: theme.palette.primary.main,
                borderRadius: 2,
                minWidth: 40,
                textAlign: "center",
                width: 40,
                height: 40,
              }}
            >
              {icon}
            </Box>
            <Box
              sx={{
                minWidth: "17ch",
                textAlign: "center",
                color: "grey",
              }}
            >
              <Typography variant="h6" gutterBottom>
                {amount}
              </Typography>
            </Box>
          </Box>
          <Box
            component="footer"
            sx={{
              textAlign: "center",
              color: "grey",
              minWidth: "25ch",
              marginTop: 1,
            }}
          >
            <Typography noWrap>{title}</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
