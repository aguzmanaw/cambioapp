export const getAskCurrency = ({
  rateType,
  customerCurrency,
  businessCurrency,
}) => {
  return rateType === "compra" ? businessCurrency : customerCurrency;
};
