import { fetchGenerateBalance, fetchGetBalance } from "@/services/balance";
import { create } from "zustand";

export const useBalancesStore = create(
  (set) => {
    return {
      balances: [],
      loading: false,
      info: {},

      getBalances: async () => {
        set({ loading: true }, false, "FETCH_BALANCE");
        const response = await fetchGetBalance();
        const { menssage, ...data } = response;

        console.log({ data, menssage });
      },

      generateBalance: async () => {
        set({ loading: true }, false, "GENERATE_BALANCE");

        const response = await fetchGenerateBalance();
        console.log({ response });
      },
    };
  },
  {
    name: "balances",
  }
);
