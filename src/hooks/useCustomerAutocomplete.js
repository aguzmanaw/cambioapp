import { useEffect } from "react";
import { useCustomersStore } from "@/store/customers";

export const useCustomerAutocomplete = (term, minLength = 3) => {
  const customers = useCustomersStore((state) => state.customers);
  const loading = useCustomersStore((state) => state.loading);
  const getCustomersByParam = useCustomersStore(
    (state) => state.getCustomersByParam
  );

  useEffect(() => {
    if (term.length >= minLength && !term.includes("(")) {
      getCustomersByParam(term);
    }
  }, [getCustomersByParam, term, minLength]);

  const customerOptions = customers.reduce((acc, data) => {
    const id = data.id;
    const description = `(${data.dni}) ${data.firstname} ${data.lastname}`;
    return { ...acc, [id]: description };
  }, {});

  const defaultValue = Object.keys(customerOptions).filter((key) =>
    customerOptions[key].includes(term)
  );

  return {
    term,
    customers,
    defaultValue,
    customerOptions,
    loading,
    getCustomersByParam,
  };
};
