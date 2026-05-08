import { useEffect } from "react";

import { useAccountsStore } from "@/store/accounts";

export const useAccountsPayment = ({ params }) => {
  const loading = useAccountsStore((state) => state.loading);
  const getAccountsFromPaymentByOrder = useAccountsStore(
    (state) => state.getAccountsFromPaymentByOrder
  );
  const accountsByPayment = useAccountsStore(
    (state) => state.accountsByPayment
  );
  const { id } = params;

  useEffect(() => {
    if (id) getAccountsFromPaymentByOrder(id);
  }, [getAccountsFromPaymentByOrder, id]);

  return {
    getAccountsFromPaymentByOrder,
    loading,
    accountsByPayment,
  };
};
