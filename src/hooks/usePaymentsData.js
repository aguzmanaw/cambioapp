import { useNotificationStore } from "@/store/notifications";
import { usePaymentsStore } from "@/store/payments";
import {
  ActionType,
  PAYMENT_CREATE_SUCCESSFULLY,
  PAYMENT_DELETE_SUCCESSFULLY,
  PAYMENT_UPDATE_SUCCESSFULLY,
} from "@/utils/constants";
import { showMessage } from "@/utils/showMessage";
import { useCallback, useEffect } from "react";

export const usePaymentsData = (action = ActionType.LIST) => {
  const payments = usePaymentsStore((state) => state.payments);
  const payment = usePaymentsStore((state) => state.payment);
  const loading = usePaymentsStore((state) => state.loading);
  const getPaymentsByOrderId = usePaymentsStore(
    (state) => state.getPaymentsByOrderId
  );
  const createPayment = usePaymentsStore((state) => state.createPayment);
  const error = usePaymentsStore((state) => state.error);
  const notificationShow = useNotificationStore(
    (state) => state.notificationShow
  );

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
    console.log({ action, payment, error });
    refereshMessage({
      notificationShow: notificationShow,
      data: payment,
      action,
      error,
      messageTypes: {
        ADD: PAYMENT_CREATE_SUCCESSFULLY,
        UPDATE: PAYMENT_UPDATE_SUCCESSFULLY,
        DELETE: PAYMENT_DELETE_SUCCESSFULLY,
      },
    });
  }, [notificationShow, refereshMessage, action, payment, error]);

  return {
    payments,
    payment,
    loading,
    error,
    createPayment,
    getPaymentsByOrderId,
  };
};
