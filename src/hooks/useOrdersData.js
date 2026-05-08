import { useCallback, useEffect } from "react";
import { useOrdersStore } from "@/store/orders";
import {
  ActionType,
  ORDER_CREATE_SUCCESSFULLY,
  ORDER_DELETE_SUCCESSFULLY,
  ORDER_UPDATE_SUCCESSFULLY,
} from "@/utils/constants";
import { useNotificationStore } from "@/store/notifications";
import { showMessage } from "@/utils/showMessage";

export const useOrdersData = ({ action }) => {
  const orders = useOrdersStore((state) => state.orders);
  const loading = useOrdersStore((state) => state.loading);
  const getOrders = useOrdersStore((state) => state.getOrders);
  const getOrder = useOrdersStore((state) => state.getOrder);
  const error = useOrdersStore((state) => state.error);
  const updateOrder = useOrdersStore((state) => state.updateOrder);
  const order = useOrdersStore((state) => state.order);
  const notificationShow = useNotificationStore(
    (state) => state.notificationShow
  );

  useEffect(() => {
    if (action === ActionType.LIST) {
      getOrders();
    }
  }, [getOrders, action]);

  const refereshMessage = useCallback(
    ({ notificationShow, data, action, error, messageTypes }) => {
      return showMessage({
        notificationShow,
        data,
        action,
        error,
        messageTypes,
      });
    },
    []
  );

  useEffect(() => {
    refereshMessage({
      notificationShow: notificationShow,
      data: order,
      action,
      error,
      messageTypes: {
        ADD: ORDER_CREATE_SUCCESSFULLY,
        UPDATE: ORDER_UPDATE_SUCCESSFULLY,
        DELETE: ORDER_DELETE_SUCCESSFULLY,
      },
    });
  }, [notificationShow, refereshMessage, action, order, error]);

  return {
    orders,
    loading,
    error,
    updateOrder,
    order,
    getOrder,
  };
};
