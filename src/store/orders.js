import { create } from "zustand";
import {
  fetchCreateOrder,
  fetchGetOrder,
  fetchGetOrderReceiptFile,
  fetchUpdateOrder,
} from "@/services/orders";
import { fetchOrders } from "@/services/orders";
import { getResponseError } from "@/utils/getResponseError";
import { mapResponseJsonToOrders } from "@/utils/mappers/mapResponseJsonToOrders";
import { mapOrdersToRequestJson } from "@/utils/mappers/mapOrdersToRequestJson";
import {
  CREATE_ORDER,
  FETCH_ORDER,
  FETCH_ORDERS,
  UPDATE_ORDER,
} from "@/utils/constants";

export const useOrdersStore = create(
  (set, get) => {
    return {
      orders: [],
      order: null,
      loading: false,
      error: null,
      receiptFile: null,

      getOrders: async () => {
        const response = await fetchOrders();

        const { message, data } = response;

        if (!message && data && data.length) {
          const orderes = mapResponseJsonToOrders(data);

          set({ orders: orderes, order: null }, false, FETCH_ORDERS);
        } else {
          const err = await getResponseError(response);
          set({ loading: false, error: err, order: null }, false, FETCH_ORDERS);
        }
      },

      createOrder: async (data) => {
        set({ loading: true }, false, CREATE_ORDER);
        const [order] = mapOrdersToRequestJson([data]);

        const response = await fetchCreateOrder(order);

        const { message, operation } = response;

        if (message && operation) {
          const prevOrders = get().orders;
          const [order] = mapResponseJsonToOrders([operation]);
          const orders = [order, ...prevOrders];

          set(
            { orders: orders, order: order, loading: false, error: {} },
            false,
            CREATE_ORDER
          );
        } else {
          const err = await getResponseError(response);
          set({ loading: false, error: err, order: null }, false, CREATE_ORDER);
        }
      },

      updateOrder: async ({ id, data }) => {
        set({ loading: true }, false, UPDATE_ORDER);

        const [order] = mapOrdersToRequestJson([data]);

        const response = await fetchUpdateOrder({ id, data: order });

        const { message, operation } = response;

        if (message && operation) {
          const orders = get().orders;
          const [order] = mapResponseJsonToOrders([operation]);

          const index = orders.findIndex((order) => order.id === id);

          orders[index] = order;

          set(
            {
              orders: orders,
              order: order,
              loading: false,
              error: null,
            },
            false,
            UPDATE_ORDER
          );
        } else {
          const err = await getResponseError(response);
          set({ loading: false, error: err, order: null }, false, UPDATE_ORDER);
        }
      },

      getOrder: async ({ id }) => {
        set({ loading: true }, false, FETCH_ORDER);

        const response = await fetchGetOrder({ id });
        const { message, ...operation } = response;

        if (!message && operation) {
          const [order] = mapResponseJsonToOrders([operation]);

          const orders = get().orders;

          const index = orders.findIndex((data) => data.id === id);

          orders[index] = order;

          set({ order: order, loading: false }, false, FETCH_ORDER);
        } else {
          const err = await getResponseError(response);
          set({ loading: false, error: err, order: null }, false, FETCH_ORDER);
        }
      },

      getOrderReceiptFile: async (filename) => {
        const response = await fetchGetOrderReceiptFile(filename);

        const { message } = response;

        if (!message) {
          set({ receiptFile: response, error: {} }, false, "RECEIPT_ORDER");
        } else {
          set(
            {
              error: {
                code: "404",
                message: message,
              },
            },
            false,
            "RECEIPT_ORDER"
          );
        }
      },

      removeOrderReceipt: () => {
        set({ receiptFile: null }, false, "REMOVE_ORDER_RECEIPT");
      },
    };
  },
  {
    name: "orders",
    version: 2,
  }
);
