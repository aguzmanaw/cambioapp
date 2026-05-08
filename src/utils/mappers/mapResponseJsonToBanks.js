//data?.user_id ??
export const mapResponseJsonToBanks = (data) => {
  return data.map((data) => ({
    id: data?.id,
    description: data?.description,
    code: data?.identification_code,
    currencyName: data?.currency.name,
    currencyType: data?.currency.type,
    currencyCode: data?.currency.code,
    currencySymbol: data?.currency.symbol,
    balance: data?.balance ?? 0,
    dailyLimit: data?.daily_limit ?? 0,
    availableLimit: data?.limit_available ?? 0,
    disable: data?.disable,
    createdBy: data?.managed_by.corporate_email,
    limitDate: data?.limit_date,
    createdAt: data?.created_at,
    updatedAt: data?.updated_at,
  }));
};
