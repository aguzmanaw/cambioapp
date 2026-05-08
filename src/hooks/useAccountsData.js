import { useCallback, useEffect } from "react";
import { useAccountsStore } from "../store/accounts";
import { useNotificationStore } from "@/store/notifications";
import {
  ACCOUNT_CREATE_SUCCESSFULLY,
  ACCOUNT_UPDATE_SUCCESSFULLY,
  ACCOUNT_DELETE_SUCCESSFULLY,
  ActionType,
} from "@/utils/constants";

import { showMessage } from "@/utils/showMessage";

export const useAccountsData = (action, params = {}) => {
  const accounts = useAccountsStore((state) => state.accounts);
  const account = useAccountsStore((state) => state.account);
  const loading = useAccountsStore((state) => state.loading);
  const getAccounts = useAccountsStore((state) => state.getAccounts);
  const error = useAccountsStore((state) => state.error);
  const createAccount = useAccountsStore((state) => state.createAccount);
  const updateAccount = useAccountsStore((state) => state.updateAccount);
  const deleteAccount = useAccountsStore((state) => state.deleteAccount);
  const getAccountById = useAccountsStore((state) => state.getAccountById);
  const notificationShow = useNotificationStore(
    (state) => state.notificationShow
  );
  const info = useAccountsStore((state) => state.info);
  const getAccountsByParam = useAccountsStore(
    (state) => state.getAccountsByParam
  );

  const refereshMessage = useCallback(
    ({ notificationShow, data, action, error, messageTypes }) => {
      return showMessage({
        notificationShow,
        data,
        action,
        error,
        messageTypes,
      });
    },
    []
  );

  const { search, page } = params;

  useEffect(() => {
    if (ActionType.LIST === action) {
      if (!search) getAccounts(page);
      else getAccountsByParam(search);
    }
  }, [getAccounts, getAccountsByParam, action, search, page]);

  useEffect(() => {
    refereshMessage({
      notificationShow: notificationShow,
      data: account,
      action,
      error,
      messageTypes: {
        ADD: ACCOUNT_CREATE_SUCCESSFULLY,
        UPDATE: ACCOUNT_UPDATE_SUCCESSFULLY,
        DELETE: ACCOUNT_DELETE_SUCCESSFULLY,
      },
    });
  }, [notificationShow, refereshMessage, action, account, error]);

  return {
    accounts,
    account,
    loading,
    getAccountById,
    getAccounts,
    error,
    createAccount,
    updateAccount,
    deleteAccount,
    info,
  };
};
