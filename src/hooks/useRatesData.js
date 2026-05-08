import { useCallback, useEffect } from "react";
import { useRatesStore } from "@/store/rates";
import {
  ActionType,
  RATE_CREATE_SUCCESSFULLY,
  RATE_DELETE_SUCCESSFULLY,
  RATE_UPDATE_SUCCESSFULLY,
} from "@/utils/constants";
import { showMessage } from "@/utils/showMessage";
import { useNotificationStore } from "@/store/notifications";

export const useRatesData = (action, params = {}) => {
  const rawRates = useRatesStore((state) => state.rates);
  const getRates = useRatesStore((state) => state.getRates);
  const loading = useRatesStore((state) => state.loading);
  const error = useRatesStore((state) => state.error);
  const createRate = useRatesStore((state) => state.createRate);
  const rate = useRatesStore((state) => state.rate);
  const updateRate = useRatesStore((state) => state.updateRate);
  const info = useRatesStore((state) => state.info);
  const getRatesByParam = useRatesStore((state) => state.getRatesByParam);
  const notificationShow = useNotificationStore(
    (state) => state.notificationShow
  );

  const { search, page } = params;

  useEffect(() => {
    if (ActionType.LIST === action) {
      if (!search) getRates(page);
      else getRatesByParam(search);
    }
  }, [getRates, getRatesByParam, action, page, search]);

  const refereshMessage = useCallback(
    ({ notificationShow, data, action, error, messageTypes }) => {
      return showMessage({
        notificationShow,
        data,
        action,
        error,
        messageTypes,
      });
    },
    []
  );

  useEffect(() => {
    const customAction =
      ActionType.ADD_GROUP === action ? ActionType.ADD : action;
    refereshMessage({
      notificationShow: notificationShow,
      data: rate,
      action: customAction,
      error,
      messageTypes: {
        ADD: RATE_CREATE_SUCCESSFULLY,
        UPDATE: RATE_UPDATE_SUCCESSFULLY,
        DELETE: RATE_DELETE_SUCCESSFULLY,
      },
    });
  }, [notificationShow, refereshMessage, action, rate, error]);

  const formatExchange = ({ type, customerCurrency, businessCurrency }) =>
    `${type} 1 ${customerCurrency} por ${businessCurrency}`;

  const mapExchangesToSelect = (exchanges) => {
    if (!Array.isArray(exchanges)) return;

    return exchanges.reduce((select, rate) => {
      return select.concat(formatExchange(rate));
    }, []);
  };

  const rates = rawRates.map((rate) => {
    //customerCurrency | businessCurrency | amounts
    //Si es autogerado y venta (a)        -> amount customerCurrency  | 1 businessCurrency
    //Si es autogenerado y no venta (b)   -> amount customerCurrency  | 1 businessCurrency
    //Si no es autogerado y venta (c)     -> 1 businessCurrency  | amount customerCurrency //revisada
    //Si no es autogerado y no venta (d)  -> 1 customerCurrency  | amount businessCurrency

    const isNotAutoSale = rate.autoRate === 0 && rate.type === "venta";
    const isNotAutoAndNotSale = rate.autoRate === 0 && rate.type !== "venta";

    const isAutoSale = rate.autoRate === 1 && rate.type === "venta";
    const isAutoAndNotSale = rate.autoRate === 1 && rate.type !== "venta";

    //const isNotSale = rate.autoRate === 0 && rate.type !== "venta";

    let customerAmount = 0;
    let customerCurrency = "NADA";
    let businessAmount = 0;
    let businessCurrency = "NADA";

    //customer
    if (isNotAutoSale) {
      customerAmount = 1;
      customerCurrency = rate?.businessCurrency;

      businessAmount = rate?.amount;
      businessCurrency = rate?.customerCurrency;
    } else if (isNotAutoAndNotSale) {
      customerAmount = 1;
      customerCurrency = rate?.customerCurrency;

      businessAmount = rate?.amount;
      businessCurrency = rate?.businessCurrency;
    } else if (isAutoSale) {
      customerAmount = rate?.amount;
      customerCurrency = rate?.businessCurrency;

      businessAmount = 1;
      businessCurrency = rate?.customerCurrency;
    } else if (isAutoAndNotSale) {
      customerAmount = rate?.amount;
      customerCurrency = rate?.customerCurrency;

      businessAmount = 1;
      businessCurrency = rate?.businessCurrency;
    }

    const type = rate.autoRate ? `[${rate?.type}]` : rate?.type;

    return {
      ...rate,
      businessAmount,
      businessCurrency,
      customerAmount,
      customerCurrency,
      type,
    };
  });

  const rateOptions = mapExchangesToSelect(rates);

  return {
    rates,
    loading,
    error,
    rateOptions,
    createRate,
    rate,
    updateRate,
    info,
  };
};
