export const getSwapExchange = (exchange) => {
  const { businessCurrency, customerCurrency, type } = exchange;
  return "venta" !== type
    ? exchange
    : {
        ...exchange,
        businessCurrency: customerCurrency,
        customerCurrency: businessCurrency,
      };
};
