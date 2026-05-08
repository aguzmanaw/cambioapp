export const getBidCurrency = ({
  rateType,
  customerCurrency,
  businessCurrency,
}) => {
  return rateType === "compra" ? customerCurrency : businessCurrency;
};
