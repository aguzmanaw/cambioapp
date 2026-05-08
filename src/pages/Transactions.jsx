import { useState } from "react";
import { NewButton } from "@/components/NewButton";
import { SearchInput } from "@/components/SearchInput";
import { TransactionsTable } from "@/components/Transactions/TransactionsTable";
import { useTransactionsData } from "@/hooks/useTransactionsData";
import { Box, Stack } from "@mui/material";
import {
  ActionType,
  ERROR,
  MISSING_REQUIRED_FIELDS,
  SUCCESS,
  TRANSACTION_CREATE_SUCCESSFULLY,
} from "@/utils/constants";
import { getFormData } from "@/utils/getformdata";
import { isEmptyObject } from "@/utils/isEmptyObject";
import { useNotificationStore } from "@/store/notifications";
import { AddTransactionModal } from "@/components/Transactions/AddTransactionModal";
import { ShowTransactionModal } from "@/components/Transactions/ShowTransactionModal";
import { useAccountAutocomplete } from "@/hooks/useAccountsAutocomplete";

export default function Transactions() {
  const [options, setOptions] = useState({});
  const { transactions, createTransaction, transaction, error } =
    useTransactionsData({ action: options.action });
  const [inputValue, setInputValue] = useState("");
  const { accounts, loading: accountLoading } = useAccountAutocomplete({
    term: inputValue,
  });
  const [value, setValue] = useState({});

  const handleAccountTermChange = (event, newInputValue) => {
    setInputValue(newInputValue);
  };

  const handleAccountChange = (event, newValue) => {
    setValue(newValue);
  };

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

  const handleCreateTransaction = async (event) => {
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

    const { id: accountId } = value;

    const transactionData = { ...data, accountId };

    await createTransaction(transactionData);

    checkMessage();
  };

  const getTransactionError = () => {
    let message, notificationType;

    if (error && !isEmptyObject(error)) {
      message = error?.message;
      notificationType = ERROR;
    } else {
      if (transaction && !isEmptyObject(transaction)) {
        message = TRANSACTION_CREATE_SUCCESSFULLY;
        notificationType = SUCCESS;
      }
    }

    return {
      message,
      notificationType,
    };
  };

  const checkMessage = () => {
    const { message, notificationType } = getTransactionError();

    if (message && notificationType)
      notificationShow({
        message,
        notificationType,
      });

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
      <TransactionsTable rows={transactions} onSelect={handleRowSelect} />
      <AddTransactionModal
        showModal={ActionType.ADD === options.action}
        accountTerm={inputValue}
        accounts={accounts}
        account={value}
        accountLoading={accountLoading}
        onAccountTermChange={handleAccountTermChange}
        onAccountChange={handleAccountChange}
        onSubmit={handleCreateTransaction}
        onClose={handleClose}
      />
      <ShowTransactionModal
        showModal={ActionType.SHOW === options.action}
        transaction={options.params}
        accountTerm={inputValue}
        accounts={accounts}
        account={value}
        accountLoading={accountLoading}
        onAccountTermChange={handleAccountTermChange}
        onAccountChange={handleAccountChange}
        onSubmit={handleCreateTransaction}
        onClose={handleClose}
      />
    </>
  );
}
