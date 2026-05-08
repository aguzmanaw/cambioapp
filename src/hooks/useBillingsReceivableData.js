import { useEffect } from "react";
import { useBillingsStore } from "@/store/billings";

export const useBillingsReceivableData = ({ action, params = {} }) => {
  const ordersReceivable = useBillingsStore((state) => state.ordersReceivable);
  const loading = useBillingsStore((state) => state.loading);
  const getOrdersReceivable = useBillingsStore(
    (state) => state.getOrdersReceivable
  );
  const error = useBillingsStore((state) => state.error);
  const info = useBillingsStore((state) => state.info);

  useEffect(() => {
    const { page } = params;
    getOrdersReceivable({ page });
  }, [getOrdersReceivable, action, params]);

  return {
    ordersReceivable,
    loading,
    getOrdersReceivable,
    error,
    info,
  };
};
