import {
  Card,
  List,
  ListItem,
  ListItemAvatar,
  Skeleton,
  ListItemText,
  Box,
} from "@mui/material";

export function IncomeCard() {
  return (
    <Box
      component="div"
      sx={{
        maxWidth: "200px",
        height: "auto",
        backgroundColor: "orange",
      }}
    >
      <Card sx={{ p: 2 }}>
        <List sx={{ py: 0 }}>
          <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
            <ListItemAvatar>
              <Skeleton variant="rectangular" width={44} height={44} />
            </ListItemAvatar>
            <ListItemText
              sx={{ py: 0 }}
              primary={<Skeleton variant="rectangular" height={20} />}
              secondary={<Skeleton variant="text" />}
            />
          </ListItem>
        </List>
      </Card>
    </Box>
  );
}
