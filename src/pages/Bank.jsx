import Box from "@mui/material/Box";
import { useAccountsData } from "@/hooks/useAccountsData";
import Stack from "@mui/material/Stack";
import { NewButton } from "components/NewButton";
import { SearchInput } from "components/SearchInput";
import { BankTable } from "components/Banks/BankTable";
import { Loader } from "components/Loader";
import { AddBankModal } from "components/Banks/AddBankModal";
import { useState } from "react";
import { UpdateBankModal } from "../components/Banks/UpdateBankModal";
import { DeleteBankModal } from "../components/Banks/DeleteBankModal";
import { ShowBankModal } from "../components/Banks/ShowBankModal";
import { useCurrenciesData } from "../hooks/useCurrenciesData";
import {
  ActionType,
  CONTACT_SUPPORT,
  ERROR,
  MISSING_REQUIRED_FIELDS,
} from "@/utils/constants";

import { useNotificationStore } from "../store/notifications";
import { Paginator } from "@/components/common/Paginator";
import { getFormData } from "@/utils/getformdata";

export default function Bank({ action, params }) {
  const [options, setOptions] = useState({ action, params });
  const {
    accounts,
    getAccountById,
    createAccount,
    updateAccount,
    deleteAccount,
    loading,
    info,
  } = useAccountsData(options?.action, options?.params);
  const { currencyCodes, filterCurrencyByParms } = useCurrenciesData();
  const notificationShow = useNotificationStore(
    (state) => state.notificationShow
  );

  const resetOptions = () => {
    setOptions({
      action: ActionType.LIST,
      params: {},
    });
  };

  const handleSelectBank = (target) => () => {
    const { id } = target.params;

    setOptions({
      action: target?.action,
      params: target?.params,
    });

    getAccountById(id);
  };

  const handleCreateBank = async (event) => {
    event.preventDefault();

    try {
      const form = event.target;
      const isValid = form.checkValidity();

      if (!isValid) {
        notificationShow({
          message: MISSING_REQUIRED_FIELDS,
          notificationType: ERROR,
        });
        return;
      }

      const formData = new FormData(form);
      const data = Object.fromEntries(formData);

      const [currencyType, currencyName] = data.currencyName.split("-");

      const currentCurrency = filterCurrencyByParms({
        currencyName,
        currencyType,
      });

      const accountData = { ...data, currencyId: currentCurrency.id };

      delete accountData.id;

      await createAccount(accountData);

      resetOptions();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateBank = async (event) => {
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

    try {
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);

      const [currencyType, currencyName] = data.currencyName.split("-");

      const currentCurrency = filterCurrencyByParms({
        currencyName,
        currencyType,
      });

      const { disable, id } = data;

      const account = {
        ...data,
        currencyId: currentCurrency.id,
        disable: Number(disable),
        id: Number(id),
      };

      await updateAccount({ id, data: account });

      resetOptions();
    } catch (err) {
      console.error(err);
      notificationShow({
        message: CONTACT_SUPPORT,
        notificationType: ERROR,
      });
    }
  };

  const handleDeleteBank = async (event) => {
    event.preventDefault();

    try {
      const { id } = options.params;

      await deleteAccount({ id });

      resetOptions();
    } catch (err) {
      console.error(err);
      notificationShow({
        message: CONTACT_SUPPORT,
        notificationType: ERROR,
      });
    }
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;

    const formData = getFormData(form);

    const { search } = formData;

    setOptions((state) => ({
      action: state.action,
      params: { ...state.params, search },
    }));
  };

  const handleCloseModal = (event) => {
    event.preventDefault();

    resetOptions();
  };

  const hanglePageChange = (event, value) => {
    setOptions((prevState) => ({
      ...prevState,
      params: {
        page: value,
      },
    }));
  };

  return (
    <Box>
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
            id="newBtn"
            label="Agregar"
            onClick={() => setOptions({ action: ActionType.ADD, params: {} })}
          />
        </Box>
      </Stack>
      {!accounts && <Loader />}
      <BankTable rows={accounts} onRowClick={handleSelectBank} />
      {accounts && !loading && accounts.length > 0 && (
        <Paginator
          id="paginator"
          pages={info?.pages}
          current={info?.current}
          onChange={hanglePageChange}
        />
      )}
      <AddBankModal
        showModal={options?.action === ActionType.ADD}
        onSubmit={handleCreateBank}
        onClose={handleCloseModal}
        currencyCodes={currencyCodes}
      />
      <DeleteBankModal
        bank={options?.params}
        showModal={options?.action === ActionType.DELETE}
        onSubmit={handleDeleteBank}
        onClose={handleCloseModal}
        currencyCodes={currencyCodes}
      />
      <UpdateBankModal
        bank={options?.params}
        showModal={options?.action === ActionType.UPDATE}
        onSubmit={handleUpdateBank}
        onClose={handleCloseModal}
        currencyCodes={currencyCodes}
      />
      <ShowBankModal
        bank={options?.params}
        showModal={options?.action === ActionType.SHOW}
        onClose={handleCloseModal}
        currencyCodes={currencyCodes}
      />
    </Box>
  );
}
