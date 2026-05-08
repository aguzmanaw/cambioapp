import { create } from "zustand";
import { NOTIFICATION_HIDE, NOTIFICATION_SHOW } from "@/utils/constants";

export const useNotificationStore = create(
  (set, get) => {
    return {
      notificationOpen: false,
      notifications: [],

      notificationShow: ({ message, notificationType }) => {
        const notification = {
          message,
          notificationType,
        };

        let prevNotifications = get().notifications;
        const notifications = prevNotifications.slice(1);
        notifications.push(notification);

        set(
          { notificationOpen: true, notifications: notifications },
          false,
          NOTIFICATION_SHOW
        );
      },

      notificationHide: () => {
        const prevNotifications = get().notifications;

        const notifications = prevNotifications.slice(1);

        set(
          { notificationOpen: false, notifications },
          false,
          NOTIFICATION_HIDE
        );
      },
    };
  },
  {
    name: "notifications",
  }
);
