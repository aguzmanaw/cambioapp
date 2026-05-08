import { useTransactionsStore } from "@/store/transactions";
import { useEffect } from "react";

export const useTransactionsData = ({ action }) => {
  const transactions = useTransactionsStore((state) => state.transactions);
  const transaction = useTransactionsStore((state) => state.transaction);
  const error = useTransactionsStore((state) => state.error);
  const getTransactions = useTransactionsStore(
    (state) => state.getTransactions
  );
  const createTransaction = useTransactionsStore(
    (state) => state.createTransaction
  );

  useEffect(() => {
    getTransactions();
  }, [getTransactions, action]);

  return {
    transactions,
    error,
    createTransaction,
    transaction,
  };
};
