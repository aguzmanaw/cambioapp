export const mapExchangesToRequestJson = (exchanges) => {
  return exchanges.map((data) => {
    return {
      id: data?.id,
      type: data?.type,
      customer_currency: data?.customerCurrency,
      business_currency: data?.businessCurrency,
      recurrent: data?.recurrent,
      user_id: 1,
    };
  });
};
