import { create } from "zustand";
import {
  fetchCreatePayments,
  fetchGetFilterPayment,
  fetchGetPayment,
  fetchGetPaymentReceiptFile,
  fetchPayments,
} from "@/services/payments";
import { getResponseError } from "@/utils/getResponseError";
import { mapResponseJsonToPayments } from "@/utils/mappers/mapResponseJsonToPayments";
import { mapPaymentsToRequestJson } from "@/utils/mappers/mapPaymentsToRequestJson";
import {
  CREATE_PAYMENT,
  FETCH_FILTER_PAYMENT,
  FETCH_PAYMENT,
  FETCH_PAYMENTS,
  FETCH_PAYMENT_RECEIPT,
} from "@/utils/constants";
import { isEmptyObject } from "@/utils/isEmptyObject";

export const usePaymentsStore = create(
  (set, get) => {
    return {
      payments: [],
      loading: false,
      error: null,
      payment: null,
      receiptFile: null,

      getPayments: async () => {
        try {
          const response = await fetchPayments();
          const { message, menssage, data } = response;

          if ((message || menssage) && data) {
            const payments = mapResponseJsonToPayments(data);

            set({ payments: payments, payment: null }, false, FETCH_PAYMENTS);
          } else {
            const err = await getResponseError(response);
            set({ error: err, payment: null }, false, FETCH_PAYMENTS);
          }
        } catch (err) {
          set(
            {
              loading: false,
              error: {
                code: "500",
                message: err,
              },
              payment: null,
            },
            false,
            "FETCH_PAYMENTS"
          );
        }
      },

      getPayment: async ({ id }) => {
        try {
          const response = await fetchGetPayment({ id });

          const { message, payment } = response;

          if (message && payment) {
            const [currentPayment] = mapResponseJsonToPayments([payment]);
            set({ payment: currentPayment }, false, FETCH_PAYMENT);
          } else {
            const err = await getResponseError(response);
            set({ error: err, payment: null }, false, FETCH_PAYMENT);
          }
        } catch (err) {
          set(
            {
              loading: false,
              error: {
                code: "500",
                message: err,
              },
              payment: null,
            },
            false,
            FETCH_PAYMENT
          );
        }
      },

      createPayment: async (data) => {
        set({ loading: true }, false, CREATE_PAYMENT);
        try {
          const [payload] = mapPaymentsToRequestJson([data]);

          const response = await fetchCreatePayments(payload);

          const { message, ...payment } = response;

          if (message && !isEmptyObject(payment)) {
            const prevPayments = get().payments;
            const [addedPayment] = mapResponseJsonToPayments([payment]);

            const payments = [addedPayment, ...prevPayments];

            set(
              {
                payments: payments,
                payment: addedPayment,
                loading: false,
                error: null,
              },
              false,
              CREATE_PAYMENT
            );
          } else {
            const err = await getResponseError(response);
            set(
              { loading: false, error: err, payment: null },
              false,
              CREATE_PAYMENT
            );
          }
        } catch (err) {
          console.error(err);
          set(
            {
              loading: false,
              error: {
                code: "500",
                message: err,
              },
              payment: null,
            },
            false,
            CREATE_PAYMENT
          );
        }
      },

      getPaymentsByOrderId: async ({ id }) => {
        try {
          const response = await fetchGetFilterPayment({ id });

          const { message, data } = response;

          if (!message && data) {
            const payments = mapResponseJsonToPayments(data);

            set({ payments: payments }, false, FETCH_FILTER_PAYMENT);
          } else {
            const err = await getResponseError(response);
            set(
              {
                payments: [],
                error: err,
              },
              false,
              FETCH_FILTER_PAYMENT
            );
          }
        } catch (err) {
          set(
            {
              loading: false,
              error: {
                code: "500",
                message: err,
              },
            },
            false,
            FETCH_FILTER_PAYMENT
          );
        }
      },

      getPaymentReceiptFile: async (filename) => {
        const response = await fetchGetPaymentReceiptFile(filename);

        const { message } = response;

        if (!message) {
          set(
            { receiptFile: response, error: {} },
            false,
            FETCH_PAYMENT_RECEIPT
          );
        } else {
          set({ receiptFile: null }, false, FETCH_PAYMENT_RECEIPT);
        }
      },

      removePaymentReceipt: () => {
        set({ receiptFile: null }, false, "REMOVE_PAYMENT_RECEIPT");
      },
    };
  },
  {
    name: "payments",
  }
);
