import { useEffect } from "react";
import { useUsersStore } from "@/store/users";
import { ActionType } from "@/utils/constants";

export const useUsersData = (action, params) => {
  const users = useUsersStore((state) => state.users);
  const loading = useUsersStore((state) => state.loading);
  const getUsers = useUsersStore((state) => state.getUsers);
  const getUsersByParam = useUsersStore((state) => state.getUsersByParam);
  const info = useUsersStore((state) => state.info);
  const user = useUsersStore((state) => state.user);
  const createUser = useUsersStore((state) => state.createUser);
  const error = useUsersStore((state) => state.error);
  const deleteUser = useUsersStore((state) => state.deleteUser);
  const updateUser = useUsersStore((state) => state.updateUser);

  const getUsersById = ({ id }) => {
    if (Array.isArray(users)) return {};

    return users.find((user) => user.id === id);
  };

  const getUsersByEmail = ({ email }) => {
    return users.find((user) => {
      return user.email.includes(email.trim());
    });
  };

  useEffect(() => {
    const { search, page } = params;

    if (ActionType.LIST === action)
      if (!search) {
        getUsers(page);
      } else if (search) {
        getUsersByParam(search);
      }
  }, [getUsers, getUsersByParam, action, params]);

  return {
    users,
    loading,
    getUsersByEmail,
    getUsersById,
    getUsersByParam,
    info,
    user,
    createUser,
    deleteUser,
    updateUser,
    error,
  };
};
