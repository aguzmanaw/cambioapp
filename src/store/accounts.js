import { create } from "zustand";
import {
  fetchCreateAccount,
  fetchAccounts,
  fetchUpdateAccount,
  fetchDeleteAccount,
  fetchFilterAccounts,
  fetchGetAccountsFromPaymentByOrder,
  fetchGetAccountsFromReceiptByOrder,
} from "../services/accounts";
import { mapResponseJsonToBanks } from "@/utils/mappers/mapResponseJsonToBanks";
import { mapBanksToRequestJson } from "@/utils/mappers/mapBanksToRequestJson";
import {
  CONTACT_SUPPORT,
  CREATE_ACCOUNT,
  DELETE_ACCOUNT,
  FETCH_ACCOUNTS,
  FILTER_ACCOUNTS,
  PAYMENT_ACCOUNTS,
  RECEIPT_ACCOUNTS,
  UPDATE_ACCOUNT,
} from "@/utils/constants";
import { getResponseError } from "@/utils/getResponseError";
import { getPageInfo } from "@/utils/getPageInfo";

export const useAccountsStore = create(
  (set, get) => {
    return {
      accounts: [],
      account: null,
      loading: false,
      error: null,
      accountsByPayment: [],
      accountsByReceipt: [],
      info: {},

      getAccounts: async (page) => {
        set({ loading: true }, false, FETCH_ACCOUNTS);
        try {
          const response = await fetchAccounts({ page });
          const { message, data } = response;

          if (!message && data) {
            const { info } = getPageInfo(response);

            const accounts = mapResponseJsonToBanks(data);
            set(
              {
                accounts: accounts,
                account: null,
                loading: false,
                error: null,
                info,
              },
              false,
              FETCH_ACCOUNTS
            );
          } else {
            const err = await getResponseError(response);
            set(
              { loading: false, error: err, account: null },
              false,
              FETCH_ACCOUNTS
            );
          }
        } catch (err) {
          console.err(err);
          set(
            {
              loading: false,
              error: {
                code: "500",
                message: CONTACT_SUPPORT,
              },
              account: null,
            },
            false,
            FETCH_ACCOUNTS
          );
        }
      },

      getAccountById: ({ id }) => {
        set({ loading: true }, false, "FETCH_ACCOUNT");
        let accounts = get().accounts;
        if (accounts && accounts.lenght) {
          let newAccount = accounts.find(
            (account) => account.id === Number(id)
          );
          console.log({ newAccount });
          set({ account: newAccount, loading: false }, false, "FETCH_ACCOUNT");
        } else {
          set({ loading: false, account: null }, false, "FETCH_ACCOUNT");
        }
      },

      createAccount: async (data) => {
        set({ loading: true }, false, CREATE_ACCOUNT);

        const [request] = mapBanksToRequestJson([data]);

        const response = await fetchCreateAccount(request);

        const { message, account } = response;

        if (message && account) {
          const [currentAccount] = mapResponseJsonToBanks([account]);
          let accounts = get().accounts;

          accounts = [currentAccount, ...accounts];

          set(
            {
              accounts: accounts,
              loading: false,
              account: currentAccount,
              error: null,
            },
            false,
            CREATE_ACCOUNT
          );
        } else {
          const err = await getResponseError(response);
          set(
            { loading: false, error: err, account: null },
            false,
            CREATE_ACCOUNT
          );
        }
      },
      /*
      filterAccountsByName: async (name) => {
        set({ loading: true, error: {} }, false, "FILTER_ACCOUNT");

        const prevAccounts = get().accounts;
        const accounts = prevAccounts.find((account) =>
          account?.name.includes(name)
        );

        if (accounts && accounts.length) {
          set(
            { accounts: accounts, loading: false, error: {} },
            false,
            "FILTER_ACCOUNT"
          );
        } else {
          set(
            { loading: false, error: "No existe el registro!" },
            false,
            "FILTER_ACCOUNT"
          );
        }
      },
*/
      updateAccount: async ({ id, data }) => {
        set({ loading: true }, false, UPDATE_ACCOUNT);

        const [request] = mapBanksToRequestJson([data]);

        const response = await fetchUpdateAccount({ id, data: request });

        const { message, account } = response;

        if (message && account) {
          const [currentAccount] = mapResponseJsonToBanks([account]);
          let accounts = get().accounts;

          const index = accounts.findIndex(
            (account) => account.id === parseInt(id)
          );

          accounts[index] = currentAccount;

          set(
            {
              accounts: accounts,
              account: currentAccount,
              loading: false,
              error: null,
            },
            false,
            UPDATE_ACCOUNT
          );
        } else {
          const err = await getResponseError(response);
          set(
            { loading: false, error: err, account: null },
            false,
            UPDATE_ACCOUNT
          );
        }
      },

      deleteAccount: async ({ id }) => {
        set({ loading: true }, false, DELETE_ACCOUNT);

        const response = await fetchDeleteAccount({ id });

        const { message } = response;

        if (message && message.includes("exitosamente")) {
          const prevAccounts = get().accounts;

          const index = prevAccounts.findIndex(
            (account) => account.id === parseInt(id)
          );

          const account = prevAccounts[index];

          set(
            {
              account: account,
              loading: false,
              error: null,
            },
            false,
            DELETE_ACCOUNT
          );
        } else {
          const err = await getResponseError(response);
          set({ loading: false, error: err }, false, DELETE_ACCOUNT);
        }
      },

      getAccountsByParam: async (param) => {
        set({ loading: true }, false, FILTER_ACCOUNTS);

        let response;
        if (param) response = await fetchFilterAccounts(param);
        else response = await fetchAccounts();

        const { message, data } = response;

        if (!message && data) {
          const accounts = mapResponseJsonToBanks(data);
          set({ accounts: accounts, loading: false }, false, FILTER_ACCOUNTS);
        } else {
          const err = await getResponseError(response);
          set({ loading: false, error: err }, false, FILTER_ACCOUNTS);
        }
      },

      getAccountsFromPaymentByOrder: async (id) => {
        set({ loading: true }, false, PAYMENT_ACCOUNTS);

        const response = await fetchGetAccountsFromPaymentByOrder(id);
        const { data } = response;

        if (data) {
          const accountsByPayment = mapResponseJsonToBanks(data);
          set(
            { accountsByPayment: accountsByPayment, loading: false },
            false,
            PAYMENT_ACCOUNTS
          );
        } else {
          const err = await getResponseError(response);
          set({ loading: false, error: err }, false, PAYMENT_ACCOUNTS);
        }
      },

      getAccountsFromReceiptByOrder: async (id) => {
        set({ loading: true }, false, RECEIPT_ACCOUNTS);

        const response = await fetchGetAccountsFromReceiptByOrder(id);
        const { data } = response;

        if (data) {
          const accountsByReceipt = mapResponseJsonToBanks(data);
          set(
            { accountsByReceipt: accountsByReceipt, loading: false },
            false,
            RECEIPT_ACCOUNTS
          );
        } else {
          const err = await getResponseError(response);
          set({ loading: false, error: err }, false, RECEIPT_ACCOUNTS);
        }
      },
    };
  },
  {
    name: "accounts",
  }
);
