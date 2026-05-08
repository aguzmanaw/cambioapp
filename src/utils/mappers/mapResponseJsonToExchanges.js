export const mapResponseJsonToExchanges = (responseJson) => {
  return responseJson.map((data) => {
    return {
      id: data?.id,
      type: data?.type,
      customerCurrency: data?.customer_currency,
      businessCurrency: data?.business_currency,
      recurrent: data?.recurrent,
    };
  });
};
