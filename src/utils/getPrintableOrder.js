import { printNumber } from "./format";

export const getPrintableOrder = (order, sep = "\n", padChar = "0") => {
  const print = [];

  const rateType = order?.rateType?.toUpperCase() ?? "";
  const customerCurrency =
    order?.rateType !== "venta"
      ? order?.rateCustomerCurrency
      : order?.rateBusinessCurrency;

  const businessCurrency =
    order?.rateType !== "venta"
      ? order?.rateBusinessCurrency
      : order?.rateCustomerCurrency;

  const asset = `${rateType} ${customerCurrency}`;
  print.push(asset);

  const customerAmount = printNumber(order?.customerAmount);
  const rateAmount = printNumber(order?.rateAmount);
  const totalPayment = printNumber(order?.totalPayment);

  const calculations =
    order?.rateType !== "venta"
      ? `${customerAmount} ${customerCurrency} * ${rateAmount} ${businessCurrency}/${customerCurrency} = ${totalPayment} ${businessCurrency}`
      : `${totalPayment} ${customerCurrency} * ${rateAmount} ${businessCurrency}/${customerCurrency} = ${customerAmount} ${businessCurrency}`;

  print.push(calculations);

  const firstname = order?.customerFirstName;
  const lastname = order?.customerLastName;

  print.push("");

  const fullname = `${firstname} ${lastname}`;
  print.push(fullname);

  const accountName = order?.customerAccountName ?? "";
  print.push(accountName);

  const accountCode = order?.customerAccountCode ?? "";
  print.push(accountCode);

  if (!order?.id) return print.join(sep);

  const minSpaceLength = 5;
  const sequence = order?.id?.toString() ?? "0";
  const spaceLength =
    sequence.length < minSpaceLength ? minSpaceLength : sequence.length;
  const orderCode = `#${sequence.padStart(spaceLength, padChar)}`;
  print.push(orderCode);

  return print.join(sep);
};
