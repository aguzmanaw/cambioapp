import { useCallback, useEffect, useMemo } from "react";
import { useCurrenciesStore } from "@/store/currencies";
import { ActionType } from "@/utils/constants";

export const useCurrenciesData = (action = ActionType.LIST, params = {}) => {
  const currencies = useCurrenciesStore((state) => state.currencies);
  const getCurrencies = useCurrenciesStore((state) => state.getCurrencies);

  const getCurrencyByName = useCurrenciesStore(
    (state) => state.getCurrencyByName
  );

  useEffect(() => {
    getCurrencies();
  }, [getCurrencies, action, params]);

  const currencyCodes = useMemo(() => {
    return Array.isArray(currencies)
      ? currencies.map((currency) => {
          return `${currency?.type} - ${currency?.name}`;
        })
      : [];
  }, [currencies]);

  const currencyOptions = useMemo(() => {
    return Array.isArray(currencies)
      ? currencies.reduce((props, currency) => {
          return Array.from(new Set([...props, currency.type]));
        }, [])
      : [];
  }, [currencies]);

  const filterCurrencyByParms = useCallback(
    ({ currencyName, currencyType }) => {
      return currencies.find(
        (currency) =>
          currency?.name === currencyName.trim() &&
          currency?.type === currencyType.trim()
      );
    },
    [currencies]
  );

  return {
    currencies,
    getCurrencies,
    getCurrencyByName,
    currencyOptions,
    currencyCodes,
    filterCurrencyByParms,
  };
};
