import { create } from "zustand";
import {
  fetchCreateCustomer,
  fetchCustomers,
  fetchDeleteCustomer,
  fetchFilterCustomers,
  fetchUpdateCustomer,
} from "@/services/customer";
import { mapResponseJsonToCustomer } from "@/utils/mappers/mapResponseJsonToCustomer.js";
import { getResponseError } from "@/utils/getResponseError";
import {
  CREATE_CUSTOMER,
  DELETE_CUSTOMER,
  FETCH_CUSTOMERS,
  FILTER_CUSTOMERS,
  UPDATE_CUSTOMER,
} from "@/utils/constants";
import { mapCustomerToRequestJson } from "@/utils/mappers/mapCustomerToRequestJson";

export const useCustomersStore = create(
  (set, get) => {
    return {
      customers: [],
      loading: false,
      error: {},
      customer: {},

      getCustomers: async () => {
        set({ loading: true }, false, FETCH_CUSTOMERS);

        const response = await fetchCustomers();

        const { data, message } = response;

        if (!message && data) {
          const customers = mapResponseJsonToCustomer(data);

          set({ customers: customers, loading: false }, false, FETCH_CUSTOMERS);
        } else {
          set({ loading: false }, false, FETCH_CUSTOMERS);
        }
      },

      getCustomersByParam: async (param) => {
        set({ loading: true }, false, FILTER_CUSTOMERS);

        let response;
        if (param) response = await fetchFilterCustomers(param);
        else response = await fetchCustomers();

        const { data } = response;

        if (data) {
          const customers = mapResponseJsonToCustomer(data);
          set(
            { customers: customers, loading: false },
            false,
            FILTER_CUSTOMERS
          );
        } else {
          const err = await getResponseError(response);
          set({ loading: false, error: err }, false, FILTER_CUSTOMERS);
        }
      },

      createCustomer: async (data) => {
        set({ loading: true }, false, CREATE_CUSTOMER);

        const [payload] = mapCustomerToRequestJson([data]);

        const response = await fetchCreateCustomer(payload);

        const { message, customer } = response;

        if (message && customer) {
          const prevCustomers = get().customers;
          const [currentCustomer] = mapResponseJsonToCustomer([customer]);
          const customers = [currentCustomer, ...prevCustomers];

          set(
            {
              customers: customers,
              customer: currentCustomer,
              loading: false,
              error: {},
            },
            false,
            CREATE_CUSTOMER
          );
        } else {
          const err = await getResponseError(response);
          set(
            {
              loading: false,
              error: err,
              customer: {},
            },
            false,
            CREATE_CUSTOMER
          );
        }
      },

      updateCustomer: async ({ id, data }) => {
        set({ loading: true }, false, UPDATE_CUSTOMER);

        const [payload] = mapCustomerToRequestJson([data]);

        const response = await fetchUpdateCustomer({ id, data: payload });

        const { message, customer } = response;

        if (message && customer) {
          const [currentCustomer] = mapResponseJsonToCustomer([customer]);

          let customers = get().customers;

          const index = customers.findIndex(
            (customer) => customer.id === parseInt(id)
          );

          customers[index] = currentCustomer;

          set(
            {
              customers: customers,
              customer: currentCustomer,
              loading: false,
              error: {},
            },
            false,
            UPDATE_CUSTOMER
          );
        } else {
          const err = await getResponseError(response);
          set(
            {
              loading: false,
              error: err,
              customer: {},
            },
            false,
            UPDATE_CUSTOMER
          );
        }
      },

      deleteCustomer: async ({ id }) => {
        set({ loading: true }, false, DELETE_CUSTOMER);

        const response = await fetchDeleteCustomer({ id });

        const { message } = response;

        if (message && !message.includes("No")) {
          const prevCustomers = get().customers;

          const customers = prevCustomers.filter(
            (customer) => customer.id !== id
          );

          set(
            { customers: customers, loading: false, customer: {} },
            false,
            DELETE_CUSTOMER
          );
        } else {
          const err = await getResponseError(response);
          set({ loading: false, error: err }, false, DELETE_CUSTOMER);
        }
      },
    };
  },
  {
    name: "customers",
  }
);
