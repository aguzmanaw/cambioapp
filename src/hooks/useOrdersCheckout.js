import { useEffect } from "react";
import { useOrdersStore } from "@/store/orders";

export const useOrdersCheckout = ({ action, params }) => {
  const loading = useOrdersStore((state) => state.loading);
  const getOrder = useOrdersStore((state) => state.getOrder);
  const error = useOrdersStore((state) => state.error);
  const updateOrder = useOrdersStore((state) => state.updateOrder);
  const order = useOrdersStore((state) => state.order);

  useEffect(() => {
    getOrder(params);
  }, [getOrder, action, params]);

  return {
    loading,
    getOrder,
    error,
    updateOrder,
    order,
  };
};
