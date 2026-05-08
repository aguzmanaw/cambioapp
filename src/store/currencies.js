import { create } from "zustand";
import { fetchCurrencies } from "../services/currencies";

export const useCurrenciesStore = create(
  (set, get) => {
    return {
      loading: false,
      currencies: [],

      getCurrencies: async () => {
        set({ loading: true }, false, "FETCH_CURRENCIES");
        const prevCurrencies = get().currencies;
        let currencies = [];
        if (prevCurrencies && prevCurrencies.length)
          currencies = prevCurrencies;
        else currencies = await fetchCurrencies();

        set({ currencies, loading: false }, false, "FETCH_CURRENCIES");
      },

      getCurrencyByName: async (currencyName) => {
        const prevCurrencies = get().currencies;

        let currencies = [];

        if (prevCurrencies && prevCurrencies.length)
          currencies = prevCurrencies;
        else currencies = await fetchCurrencies();

        if (currencyName && currencies.length) {
          const currency = currencies.find(
            (currency) => currencyName === currency.name
          );

          set({ currency: currency, loading: false }, false, "FETCH_CURRENCY");
        } else {
          set({ currency: null, loading: false }, false, "FETCH_CURRENCY");
        }
      },
    };
  },
  {
    name: "currencies",
  }
);
