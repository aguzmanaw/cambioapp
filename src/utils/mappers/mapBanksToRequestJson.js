export const mapBanksToRequestJson = (data) => {
  return data.map((data) => ({
    id: Number(data?.id) ?? data?.id,
    currency_id: Number(data?.currencyId),
    identification_code: data?.code,
    description: data?.description,
    daily_limit: Number(data?.dailyLimit),
    disable: Number(data?.disable),
  }));
};
