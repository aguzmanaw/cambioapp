export const mapResponseJsonToPayments = (responseJson) => {
  return responseJson.map((data) => ({
    id: data?.id,
    accountId: data?.account?.id,
    accountCode: data?.identification_code,
    accountCurrencyId: data?.account?.currency?.id,
    accountCurrencyName: data?.account?.currency?.name ?? "",
    accountCurrencyCode: data?.account?.currency?.code ?? "",
    accountCurrencyType: data?.account?.currency?.type ?? "",
    accountDescription: data?.account?.description ?? "",
    orderId: data?.operation?.id,
    amount: data?.amount,
    receipt: data?.receipt,
  }));
};
