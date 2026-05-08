import { useState } from "react";
import { ActionType, ERROR, MISSING_REQUIRED_FIELDS } from "@/utils/constants";
import { useCustomersData } from "@/hooks/useCustomersData";
import { CustomerTable } from "@/components/Customers/CustomerTable";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { SearchInput } from "@/components/SearchInput";
import { NewButton } from "@/components/NewButton";
import { AddCustomerModal } from "@/components/Customers/AddCustomerModal";
import { useCountryData } from "@/hooks/useCountryData";
import { useJobsData } from "@/hooks/useJobsData";
import { getFormData } from "@/utils/getformdata";
import { getItemId } from "@/utils/getitemid";
import { useNotificationStore } from "@/store/notifications";
import { ShowCustomerModal } from "@/components/Customers/ShowCustomerModal";
import { UpdateCustomerModal } from "@/components/Customers/UpdateCustomerModel";
import { DeleteCustomerModal } from "@/components/Customers/DeleteCustomerModal";
import { useCustomersStore } from "@/store/customers";

export default function Customer() {
  const [options, setOptions] = useState({
    action: ActionType.LIST,
    params: {},
  });
  const { customers } = useCustomersData({
    action: options.action,
  });
  const createCustomer = useCustomersStore((state) => state.createCustomer);
  const updateCustomer = useCustomersStore((state) => state.updateCustomer);
  const deleteCustomer = useCustomersStore((state) => state.deleteCustomer);

  const { countries } = useCountryData();
  const { jobs } = useJobsData();
  const notificationShow = useNotificationStore(
    (state) => state.notificationShow
  );

  const handleSearchSubmit = (event) => {
    event.preventDefault();
  };

  const handleCreateDialog = (event) => {
    event.preventDefault();

    setOptions({
      action: ActionType.ADD,
      params: {},
    });
  };

  const handleRowSelect = (target) => (event) => {
    event.preventDefault();

    setOptions({
      action: target?.action,
      params: target?.params,
    });
  };

  const resetOptions = () => {
    setOptions({
      action: ActionType.LIST,
      params: {},
    });
  };

  const handleClose = (event) => {
    event.preventDefault();
    resetOptions();
  };

  const handleCreateCustomer = async (event) => {
    event.preventDefault();

    const form = event.target;
    const isValid = form.checkValidity();

    if (!isValid) {
      notificationShow({
        message: MISSING_REQUIRED_FIELDS,
        notificationType: ERROR,
      });
      return;
    }

    const data = getFormData(form);

    const countryId = getItemId(countries, data?.countryName);
    const jobId = getItemId(jobs, data?.jobName);

    const userId = 3;
    const customerData = { ...data, countryId, jobId, userId };

    delete customerData.id;

    await createCustomer(customerData);

    resetOptions();
  };

  const handleUpdateCustomer = async (event) => {
    event.preventDefault();

    const form = event.target;
    const isValid = form.checkValidity();

    if (!isValid) {
      notificationShow({
        message: MISSING_REQUIRED_FIELDS,
        notificationType: ERROR,
      });
      return;
    }

    const data = getFormData(form);

    const countryId = getItemId(countries, data?.countryName);
    const jobId = getItemId(jobs, data?.jobName);

    const customerData = { ...data, countryId, jobId };

    const { id } = customerData;

    await updateCustomer({ id, data: customerData });

    resetOptions();
  };

  const handleDeleteCustomer = async (event) => {
    event.preventDefault();

    const { id } = options.params;

    await deleteCustomer({ id });

    resetOptions();
  };

  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="end"
        alignItems="center"
      >
        <Box component="form" onSubmit={handleSearchSubmit}>
          <SearchInput name="search" placeholder={"Nombre"} />
        </Box>
        <Box component="form">
          <NewButton
            label={"Agregar"}
            id="newBtn"
            onClick={handleCreateDialog}
          />
        </Box>
      </Stack>
      <CustomerTable rows={customers} onRowClick={handleRowSelect} />
      <AddCustomerModal
        customer={options?.params}
        showModal={options?.action === ActionType.ADD}
        onSubmit={handleCreateCustomer}
        onClose={handleClose}
        countries={countries}
        jobs={jobs}
      />
      <ShowCustomerModal
        customer={options?.params}
        showModal={options?.action === ActionType.SHOW}
        onSubmit={handleSearchSubmit}
        onClose={handleClose}
        countries={countries}
        jobs={jobs}
      />
      <UpdateCustomerModal
        customer={options?.params}
        showModal={options?.action === ActionType.UPDATE}
        onSubmit={handleUpdateCustomer}
        onClose={handleClose}
        countries={countries}
        jobs={jobs}
      />
      <DeleteCustomerModal
        customer={options?.params}
        showModal={options?.action === ActionType.DELETE}
        onSubmit={handleDeleteCustomer}
        onClose={handleClose}
        countries={countries}
        jobs={jobs}
      />
    </>
  );
}
