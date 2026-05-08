import { ActionType, ERROR, SUCCESS } from "@/utils/constants";

export const showMessage = ({
  notificationShow = () => {},
  data,
  action,
  error,
  messageTypes,
}) => {
  if (
    !(
      ActionType.ADD === action ||
      ActionType.UPDATE === action ||
      ActionType.DELETE === action
    )
  )
    return;

  if (typeof notificationShow !== "function") return;

  if (typeof messageTypes !== "object") return;

  if (!data && error && Object.keys(error)) {
    const { message } = error;

    if (message)
      notificationShow({
        message: message,
        notificationType: ERROR,
      });
  }

  if (!error && data && Object.keys(data)) {
    let message = "";
    if (action === ActionType.ADD) message = messageTypes?.ADD;
    else if (action === ActionType.UPDATE) message = messageTypes?.UPDATE;
    else if (action === ActionType.DELETE) message = messageTypes?.DELETE;

    if (message)
      notificationShow({
        message: message,
        notificationType: SUCCESS,
      });
  }
};
