import { create } from "zustand";
import { CREATE_TRANSACTION, FETCH_TRANSACTIONS } from "@/utils/constants";
import {
  fetchCreateTransaction,
  fetchGetTransactions,
} from "@/services/transactions";
import { mapResponseToTransactions } from "@/utils/mappers/mapResponseToTransactions";
import { getResponseError } from "@/utils/getResponseError";
import { mapTransactionsToRequest } from "@/utils/mappers/mapTransactionsToRequest";

export const useTransactionsStore = create(
  (set, get) => {
    return {
      transactions: [],
      transaction: {},
      loading: false,
      error: {},

      getTransactions: async () => {
        set({ loading: true }, false, FETCH_TRANSACTIONS);

        const response = await fetchGetTransactions();

        const { message, data } = response;

        if (!message && data) {
          const transactions = mapResponseToTransactions(data);

          set(
            { transactions: transactions, loading: false },
            false,
            FETCH_TRANSACTIONS
          );
        } else {
          const err = await getResponseError(response);
          set(
            {
              loading: false,
              error: { ...err },
            },
            false,
            FETCH_TRANSACTIONS
          );
        }
      },

      createTransaction: async (data) => {
        set({ loading: true }, false, CREATE_TRANSACTION);

        const [request] = mapTransactionsToRequest([data]);
        const response = await fetchCreateTransaction(request);
        const { message, transaction } = response;

        if (!message && transaction) {
          const [currentTransaction] = mapResponseToTransactions([transaction]);
          let transactions = get().transactions;
          transactions = [currentTransaction, ...transactions];
          set(
            {
              transactions: transactions,
              transaction: currentTransaction,
              loading: false,
              error: {},
            },
            false,
            CREATE_TRANSACTION
          );
        } else {
          const err = await getResponseError(response);
          set(
            {
              loading: false,
              error: { ...err },
              transaction: {},
            },
            false,
            CREATE_TRANSACTION
          );
        }
      },
    };
  },
  {
    name: "transactions",
  }
);
