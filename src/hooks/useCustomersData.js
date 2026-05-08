import { useEffect } from "react";
import { useCustomersStore } from "../store/customers";
import { ActionType } from "@/utils/constants";

export const useCustomersData = ({ action = ActionType.LIST, params = {} }) => {
  const customers = useCustomersStore((state) => state.customers);
  const getCustomers = useCustomersStore((state) => state.getCustomers);
  const loading = useCustomersStore((state) => state.loading);
  const getCustomersByFilters = useCustomersStore(
    (state) => state.getCustomersByFilters
  );
  const createCustomer = useCustomersStore((state) => state.createCustomer);
  const updateCustomer = useCustomersStore((state) => state.updateCustomer);
  const error = useCustomersStore((state) => state.error);
  const customer = useCustomersStore((state) => state.customer);

  useEffect(() => {
    const { search, page } = params;
    if (!search) getCustomers(page);
  }, []);

  console.log({ action });

  return {
    getCustomers,
    customers,
    loading,
    getCustomersByFilters,
    createCustomer,
    updateCustomer,
    error,
    customer,
  };
};
