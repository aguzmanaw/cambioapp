import { useCallback, useEffect, useMemo } from "react";
import { useExchangesStore } from "@/store/exchanges";
import {
  ActionType,
  EXCHANGE_CREATE_SUCCESSFULLY,
  EXCHANGE_DELETE_SUCCESSFULLY,
  EXCHANGE_UPDATE_SUCCESSFULLY,
} from "@/utils/constants";
import { showMessage } from "@/utils/showMessage";
import { useNotificationStore } from "@/store/notifications";

export const useExchangesData = (action) => {
  const exchanges = useExchangesStore((state) => state.exchanges);
  const getExchanges = useExchangesStore((state) => state.getExchanges);
  const error = useExchangesStore((state) => state.error);
  const exchange = useExchangesStore((state) => state.exchange);
  const createExchange = useExchangesStore((state) => state.createExchange);
  const notificationShow = useNotificationStore(
    (state) => state.notificationShow
  );

  const getExchangeByParams = (data) => {
    return exchanges.find((exchange) => {
      return (
        exchange.businessCurrency === data.businessCurrency &&
        exchange.customerCurrency === data.customerCurrency &&
        exchange.type === data.type
      );
    });
  };

  useEffect(() => {
    if (ActionType.LIST === action) {
      getExchanges();
    }
  }, [getExchanges, action]);

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
    refereshMessage({
      notificationShow: notificationShow,
      data: exchange,
      action,
      error,
      messageTypes: {
        ADD: EXCHANGE_CREATE_SUCCESSFULLY,
        UPDATE: EXCHANGE_UPDATE_SUCCESSFULLY,
        DELETE: EXCHANGE_DELETE_SUCCESSFULLY,
      },
    });
  }, [notificationShow, refereshMessage, action, exchange, error]);

  const recurrentExchanges = useMemo(() => {
    return exchanges.filter((exchange) => {
      return exchange.recurrent;
    });
  }, [exchanges]);

  const formatExchange = ({ type, customerCurrency, businessCurrency }) =>
    `${type} (${customerCurrency}/${businessCurrency})`;

  const mapExchangesToSelect = (exchanges) => {
    if (!Array.isArray(exchanges)) return;

    return exchanges.reduce((select, exchange) => {
      return { ...select, [exchange.id]: formatExchange(exchange) };
    }, {});
  };

  //const missingExchanges = arrayDifference(exchanges, recurrents);

  const recurrentOptions = mapExchangesToSelect(exchanges);

  return {
    exchanges,
    getExchanges,
    recurrentExchanges,
    getExchangeByParams,
    error,
    exchange,
    createExchange,
    recurrentOptions,
  };
};
