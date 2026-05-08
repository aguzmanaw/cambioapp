import { useEffect } from "react";

import { useAccountsStore } from "@/store/accounts";

export const useAccountsReceipt = ({ params }) => {
  const loading = useAccountsStore((state) => state.loading);
  const getAccountsFromReceiptByOrder = useAccountsStore(
    (state) => state.getAccountsFromReceiptByOrder
  );
  const accountsByReceipt = useAccountsStore(
    (state) => state.accountsByReceipt
  );
  const { id } = params;

  useEffect(() => {
    if (id) getAccountsFromReceiptByOrder(id);
  }, [getAccountsFromReceiptByOrder, id]);

  return {
    getAccountsFromReceiptByOrder,
    loading,
    accountsByReceipt,
  };
};
