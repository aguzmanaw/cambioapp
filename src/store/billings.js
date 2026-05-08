import { create } from "zustand";
import { FETCH_PAYABLE_ORDER, FETCH_RECEIVABLE_ORDER } from "@/utils/constants";
import { getResponseError } from "@/utils/getResponseError";
import { mapResponseJsonToOrders } from "@/utils/mappers/mapResponseJsonToOrders";
import {
  fetchGetOrdersPayable,
  fetchGetOrdersReceivable,
  fetchGetOrdersStatics,
} from "@/services/orders";
import { getPageInfo } from "@/utils/getPageInfo";
import { mapReponseJsonToWeeklyBillings } from "@/utils/mappers/mapReponseJsonToWeeklyBillings";

export const useBillingsStore = create(
  (set) => {
    return {
      loading: false,
      ordersReceivable: [],
      ordersPayable: [],
      error: {},
      info: {},
      customers: 0,
      weekly: {
        totalOperations: 0,
        operationsOpened: 0,
        operationsPayable: 0,
        operationsReceivable: 0,
        pendingOperations: 0,
        operationsClosed: 0,
        operationsDisabled: 0,
      },
      dollars: {
        payable: 0,
        receivable: 0,
        balance: 0,
      },
      euros: {
        payable: 0,
        receivable: 0,
        balance: 0,
      },
      pesosArgentinos: {
        payable: 0,
        receivable: 0,
        balance: 0,
      },
      bolivares: {
        payable: 0,
        receivable: 0,
        balance: 0,
      },
      reales: {
        payable: 0,
        receivable: 0,
        balance: 0,
      },

      getOrdersReceivable: async (page) => {
        set({ loading: true }, false, FETCH_RECEIVABLE_ORDER);

        const response = await fetchGetOrdersReceivable(page);

        const { data } = response;

        if (data) {
          const ordersReceivable = mapResponseJsonToOrders(data);
          const { info } = getPageInfo(response);

          set(
            { ordersReceivable: ordersReceivable, loading: false, info: info },
            false,
            FETCH_RECEIVABLE_ORDER
          );
        } else {
          const err = getResponseError(response);
          set({ error: err, loading: false }, false, FETCH_RECEIVABLE_ORDER);
        }
      },

      getOrdersPayable: async (page) => {
        set({ loading: true }, false, FETCH_PAYABLE_ORDER);

        const response = await fetchGetOrdersPayable(page);

        const { data } = response;

        if (data) {
          const ordersPayable = mapResponseJsonToOrders(data);
          const { info } = getPageInfo(response);

          set(
            { ordersPayable: ordersPayable, loading: false, info: info },
            false,
            FETCH_PAYABLE_ORDER
          );
        } else {
          const err = getResponseError(response);
          set({ error: err, loading: false }, false, FETCH_PAYABLE_ORDER);
        }
      },

      getOrdersStatics: async () => {
        set({ loading: true }, false, "FETCH_STATICS_ORDER");

        const response = await fetchGetOrdersStatics();

        const { weekly: weeklyJson } = response;
        if (weeklyJson) {
          const [weeklyBillings] = mapReponseJsonToWeeklyBillings([weeklyJson]);

          set(
            { weekly: weeklyBillings, loading: false },
            false,
            "FETCH_STATICS_ORDER"
          );
        } else {
          const err = getResponseError(response);
          set({ error: err, loading: false }, false, "FETCH_STATICS_ORDER");
        }
      },
    };
  },
  {
    name: "billings",
  }
);
