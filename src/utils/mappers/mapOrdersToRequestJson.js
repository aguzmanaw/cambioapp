import { removeEmpty } from "./removeEmpty";

export const mapOrdersToRequestJson = (orders) => {
  return orders.map((data) => {
    const fields = {
      id: isNaN(data?.id) ? undefined : data?.id,
      account_id: isNaN(data?.accountId) ? undefined : data?.accountId,
      customer_id: isNaN(data?.customerId) ? undefined : data?.customerId,
      customer_account_name: data?.customerAccountName,
      customer_identification_code: data?.customerAccountCode,
      rate_id: isNaN(data?.rateId) ? undefined : Number(data?.rateId),
      special_rate: isNaN(data?.specialRate) ? undefined : data?.specialRate,
      rate_amount: isNaN(data?.rateAmount) ? undefined : data?.rateAmount,
      customer_amount: data?.customerAmount,
      customer_receipt: data?.customerReceipt,
      description: data?.description,
    };

    return removeEmpty(fields);
  });
};
