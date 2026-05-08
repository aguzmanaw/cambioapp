import { useEffect } from "react";
import { useCountriesStore } from "../store/countries";

export const useCountryData = () => {
  const countries = useCountriesStore((state) => state.countries);
  const loading = useCountriesStore((state) => state.loading);
  const getCountries = useCountriesStore((state) => state.getCountries);

  useEffect(() => {
    getCountries();
  }, []);

  return {
    countries,
    loading,
  };
};
