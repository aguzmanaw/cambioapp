import { create } from "zustand";
import { fetchCountries } from "../services/countries";

export const useCountriesStore = create(
  (set, get) => {
    return {
      loading: false,
      countries: [],
      options: [],

      getCountries: async () => {
        set({ loading: true }, false, "FETCH_COUNTRIES");

        let countries = [];
        const prevCountries = get().countries;
        if (prevCountries && prevCountries.length) countries = prevCountries;
        else countries = await fetchCountries();

        set({ countries, loading: false }, false, "FETCH_COUNTRIES");
      },

      getCountryOptions() {
        const { countries } = get();
        const options = countries;
        set({ options }, false, "MAP_COUNTRIES");
      },
    };
  },
  {
    name: "countries",
  }
);
