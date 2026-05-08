import { useBillingsStore } from "@/store/billings";
import { useEffect } from "react";

export const useBillingsStaticsData = () => {
  const weekly = useBillingsStore((state) => state.weekly);
  const getOrdersStatics = useBillingsStore((state) => state.getOrdersStatics);
  const loading = useBillingsStore((state) => state.loading);

  useEffect(() => {
    getOrdersStatics();
  }, [getOrdersStatics]);

  return {
    getOrdersStatics,
    loading,
    weekly,
  };
};
