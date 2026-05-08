export const mapTransactionsToRequest = (responseJson) => {
  return responseJson.map((data) => ({
    id: data?.id,
    account_id: data?.accountId,
    type: data?.type,
    description: data?.description,
    amount: data?.amount,
  }));
};
