import { useEffect } from "react";
import { useAccountsStore } from "@/store/accounts";

export const useAccountAutocomplete = ({ term, minLength = 3 }) => {
  const accounts = useAccountsStore((state) => state.accounts);
  const loading = useAccountsStore((state) => state.loading);
  const getAccountsByParam = useAccountsStore(
    (state) => state.getAccountsByParam
  );

  useEffect(() => {
    getAccountsByParam();
  }, [getAccountsByParam, term, minLength]);

  return {
    term,
    accounts,
    loading,
  };
};
