import { create } from "zustand";
import {
  fetchCreateUser,
  fetchDeleteUser,
  fetchFilterUsers,
  fetchUpdateUser,
  fetchUsers,
} from "@/services/users";
import {
  CREATE_USER,
  DELETE_USER,
  FETCH_USERS,
  FILTER_USERS,
  LOGIN,
  LOGOUT,
  UPDATE_USER,
} from "@/utils/constants";
import { mapResponseJsonToUsers } from "@/utils/mappers/map-response-to-users";
import { mapUsersToRequestJson } from "@/utils/mappers/mapUsersToRequestJson";
import { getResponseError } from "@/utils/getResponseError";
import { getPageInfo } from "@/utils/getPageInfo";

export const useUsersStore = create(
  (set, get) => {
    return {
      users: [],
      loading: false,
      error: {},
      username: "",
      info: {},
      user: {},

      getUsers: async (page) => {
        set({ loading: true }, false, FETCH_USERS);
        try {
          const response = await fetchUsers({ page });
          const { message, data } = response;

          if (!message && data) {
            const users = mapResponseJsonToUsers(data);

            const { info } = getPageInfo(response);

            set(
              {
                users: users,
                loading: false,
                info: info,
              },
              false,
              FETCH_USERS
            );
          } else {
            const err = getResponseError(response);
            set({ loading: false, error: err }, false, FETCH_USERS);
          }
        } catch (err) {
          console.log(err);
          set(
            { user: {}, loading: false, error: err, info: {} },
            false,
            FETCH_USERS
          );
        }
      },

      signIn: (username) => {
        set({ username: username }, false, LOGIN);
      },

      signOut: () => {
        set({ username: "" }, false, LOGOUT);
      },

      getUsersByParam: async (param) => {
        set({ loading: true }, false, FILTER_USERS);

        const response = await fetchFilterUsers(param);

        const { message, data } = response;

        if (!message && data) {
          const users = mapResponseJsonToUsers(data);

          set({ users: users, loading: false }, false, FILTER_USERS);
        } else {
          const err = await getResponseError(response);
          set({ users: [], loading: false, error: err }, false, FILTER_USERS);
        }
      },

      createUser: async (data) => {
        set({ loading: true }, false, CREATE_USER);

        const [payload] = mapUsersToRequestJson([data]);

        try {
          const response = await fetchCreateUser(payload);

          const { message, user } = response;

          if (message && user) {
            const prevUsers = get().users;
            const [currentUser] = mapResponseJsonToUsers([user]);

            const users = [currentUser, ...prevUsers];

            set(
              {
                users: users,
                user: currentUser,
                loading: false,
                error: {},
              },
              false,
              CREATE_USER
            );
          } else {
            const err = await getResponseError(response);
            set({ user: {}, loading: false, error: err }, false, CREATE_USER);
          }
        } catch (err) {
          console.log(err);
          set(
            {
              loading: false,
              error: {
                code: "500",
                message: err,
                user: {},
              },
            },
            false,
            CREATE_USER
          );
        }
      },

      deleteUser: async (id) => {
        set({ loading: true }, false, DELETE_USER);

        const response = await fetchDeleteUser(id);
        const { message, user } = response;
        if (message && user) {
          const prevUsers = get().users;

          const users = prevUsers.filter((user) => user.id !== Number(id));

          const index = prevUsers.findIndex((user) => user.id === Number(id));
          const user = prevUsers[index];

          set({ users: users, loading: false, user: user }, false, DELETE_USER);
        } else {
          const err = await getResponseError(response);
          set(
            {
              loading: false,
              user: {},
              error: err,
            },
            false,
            DELETE_USER
          );
        }
      },

      updateUser: async ({ id, data }) => {
        set({ loading: true }, false, UPDATE_USER);

        const [payload] = mapUsersToRequestJson([data]);

        const response = await fetchUpdateUser({ id, data: payload });

        const { message } = response;

        if (message && message.includes("satisfactoriamente")) {
          const currentUser = { ...data, id };

          let users = get().users;

          const index = users.findIndex((user) => user.id === parseInt(id));

          users[index] = currentUser;

          set(
            {
              users: users,
              user: currentUser,
              loading: false,
              error: {},
            },
            false,
            UPDATE_USER
          );
        } else {
          const err = await getResponseError(response);
          set(
            {
              loading: false,
              error: err,
              user: {},
            },
            false,
            UPDATE_USER
          );
        }
      },
    };
  },
  {
    name: "users",
  }
);
