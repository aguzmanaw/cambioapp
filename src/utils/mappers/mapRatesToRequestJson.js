export const mapRatesToRequestJson = (rates) => {
  return rates.map((rate) => {
    return {
      exchange_id: isNaN(rate?.exchangeId)
        ? undefined
        : parseInt(rate?.exchangeId),
      amount: isNaN(rate?.amount) ? undefined : rate?.amount,
    };
  });
};
