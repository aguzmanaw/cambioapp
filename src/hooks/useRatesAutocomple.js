import { useEffect } from "react";
import { useRatesStore } from "@/store/rates";
import { printDate } from "@/utils/format";

export const useRatesAutocomplete = (term, minLength = 3) => {
  const allRates = useRatesStore((state) => state.rates);
  const loading = useRatesStore((state) => state.loading);
  const getRatesByParam = useRatesStore((state) => state.getRatesByParam);

  useEffect(() => {
    if (term && term.length >= minLength) getRatesByParam(term);
  }, [getRatesByParam, term, minLength]);

  const rates = allRates.filter((rate) => {
    return rate.createdAt === printDate(new Date());
  });

  return {
    rates,
    loading,
    getRatesByParam,
  };
};
