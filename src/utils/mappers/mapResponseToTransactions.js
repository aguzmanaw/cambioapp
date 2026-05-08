export const mapResponseToTransactions = (responseJson) => {
  return responseJson.map((data) => ({
    id: data?.id,
    accountId: data?.account?.id,
    accountCode: data?.account?.identification_code,
    accountDescription: data?.account?.description,
    currencyId: data?.account?.currency?.id,
    currencyType: data?.account?.currency?.type,
    currencyName: data?.account?.currency?.name,
    currencyCode: data?.account?.currency?.code,
    description: data?.description,
    type: data?.type,
    amount: data?.amount,
    createdBy: data?.managed_by?.corporate_email,
    createdAt: data?.created_at,
    updatedAt: data?.updated_at,
  }));
};
