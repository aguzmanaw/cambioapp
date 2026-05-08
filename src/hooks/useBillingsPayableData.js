import { useEffect } from "react";
import { useBillingsStore } from "@/store/billings";

export const useBillingsPayableData = ({ action, params = {} }) => {
  const ordersPayable = useBillingsStore((state) => state.ordersPayable);
  const getOrdersPayable = useBillingsStore((state) => state.getOrdersPayable);
  const error = useBillingsStore((state) => state.error);
  const loading = useBillingsStore((state) => state.loading);
  const info = useBillingsStore((state) => state.info);

  useEffect(() => {
    const { page } = params;
    getOrdersPayable({ page });
  }, [getOrdersPayable, action, params]);

  return {
    ordersPayable,
    loading,
    getOrdersPayable,
    error,
    info,
  };
};
