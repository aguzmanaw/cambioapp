import { forwardRef } from "react";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useNotificationStore } from "@/store/notifications";

export function Notification({ vertical = "bottom", horizontal = "right" }) {
  const notifications = useNotificationStore((state) => state.notifications);

  const notificationOpen = useNotificationStore(
    (state) => state.notificationOpen
  );
  const notificationHide = useNotificationStore(
    (state) => state.notificationHide
  );

  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = () => {
    notificationHide();
  };

  /*
  const sortedNotifications = notifications.toSorted(
    (a, b) => a.index > b.index
  );
*/
  const CustomSanckbar = notifications.map((notification, index) => (
    <Snackbar
      open={notificationOpen}
      key={`${index}${vertical}${horizontal}`}
      autoHideDuration={2000}
      onClose={handleClose}
      anchorOrigin={{ vertical, horizontal }}
    >
      <Alert severity={notification?.notificationType} sx={{ width: "100%" }}>
        {notification?.message}
      </Alert>
    </Snackbar>
  ));

  return CustomSanckbar;
}
