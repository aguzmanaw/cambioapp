export const mapResponseJsonToRates = (responseJson) => {
  return responseJson.map((data) => {
    return {
      id: data?.id,
      exchangeId: data?.exchange?.id,
      type: data?.exchange?.type,
      customerCurrency: data?.exchange?.customer_currency,
      businessCurrency: data?.exchange?.business_currency,
      amount: data?.amount,
      recurrent: data?.exchange?.recurrent,
      createdBy: data?.managed_by?.corporate_email,
      createdAt: new Date(data?.created_at).toLocaleDateString("es-CL"),
      autoRate: data?.auto_rate,
    };
  });
};
