import { useEffect } from "react";
import { useSteppersStore } from "@/store/steppers";
import { useOrdersStore } from "@/store/orders";

export const useStepperData = (step) => {
  const values = useSteppersStore((state) => state.values);
  const error = useSteppersStore((state) => state.error);
  const status = useSteppersStore((state) => state.status);
  const addPurcharse = useSteppersStore((state) => state.addPurcharse);
  const resetCustomer = useSteppersStore((state) => state.resetCustomer);
  const resetCheckout = useSteppersStore((state) => state.resetCheckout);
  const checkValidity = useSteppersStore((state) => state.checkValidity);
  const order = useOrdersStore((state) => state.order);

  useEffect(() => {
    checkValidity(step);
  }, [checkValidity, values, step]);

  useEffect(() => {
    if (!error && order && status === "CHECKOUT") addPurcharse();
  }, [addPurcharse, order, error, status, step]);

  useEffect(() => {
    if (!order && step === 0 && status === "PURCHASE") {
      resetCheckout();
      resetCustomer();
    }
  }, [resetCheckout, resetCustomer, status, order, step]);

  return {
    values,
    status,
    error,
    addPurcharse,
    resetCustomer,
    resetCheckout,
    checkValidity,
  };
};
