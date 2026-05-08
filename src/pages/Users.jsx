import { useState } from "react";
import { NewButton } from "@/components/NewButton";
import { SearchInput } from "@/components/SearchInput";
import { AddUserModal } from "@/components/Users/AddUserModal";
import { UserTable } from "@/components/Users/UserTable";
import { Paginator } from "@/components/common/Paginator";
import { useCountryData } from "@/hooks/useCountryData";
import { useUsersData } from "@/hooks/useUsersData";
import { useNotificationStore } from "@/store/notifications";
import {
  ActionType,
  ERROR,
  MISSING_REQUIRED_FIELDS,
  PASSWORD_CONFIRMATION_MISMATCH,
  SUCCESS,
  USER_DELETE_SUCCESSFULLY,
} from "@/utils/constants";
import { getFormData } from "@/utils/getformdata";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { getItemId } from "@/utils/getitemid";
import { ShowUserModal } from "@/components/Users/ShowUserModal";
import { DeleteUserModal } from "@/components/Users/DeleteUserModal";
import { isEmptyObject } from "@/utils/isEmptyObject";
import { UpdateUserModal } from "@/components/Users/UpdateUserModal";

export default function Users({ action, params }) {
  const { countries } = useCountryData();
  const [options, setOptions] = useState({ action: action, params: params });
  const {
    users,
    createUser,
    deleteUser,
    updateUser,
    loading,
    info,
    user,
    error,
  } = useUsersData(options.action, options.params);
  const notificationShow = useNotificationStore(
    (state) => state.notificationShow
  );

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

  const handleOpenDialog = (event) => {
    event.preventDefault();

    setOptions({
      action: ActionType.ADD,
      params: {},
    });
  };

  const resetOptions = () => {
    setOptions((prevState) => ({
      ...prevState,
      action: ActionType.LIST,
    }));
  };

  const handleCloseUser = () => {
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

  const handleCreateUser = async (event) => {
    event.preventDefault();

    const form = event.target;
    const isValid = form.checkValidity();
    const data = getFormData(form);

    if (!isValid) {
      notificationShow({
        message: MISSING_REQUIRED_FIELDS,
        notificationType: ERROR,
      });
      return;
    }

    if (data.password !== data.confirmPassword) {
      notificationShow({
        message: MISSING_REQUIRED_FIELDS,
        notificationType: ERROR,
      });
      return;
    }

    const countryId = getItemId(countries, data?.countryName);

    const userData = { ...data, countryId };

    setOptions((prevState) => ({ ...prevState, params: userData }));

    await createUser(userData);

    resetOptions();
  };

  const handleSelect = (target) => (event) => {
    event.preventDefault();

    setOptions({
      action: target?.action,
      params: target?.params,
    });
  };

  const handleDeleteUser = async (event) => {
    event.preventDefault();

    const { id } = options.params;

    await deleteUser({ id });

    resetOptions();

    if (!isEmptyObject(error)) {
      const { message } = error;
      if (message)
        notificationShow({
          message: message,
          notificationType: ERROR,
        });

      return;
    } else {
      if (user && !isEmptyObject(user)) {
        notificationShow({
          message: USER_DELETE_SUCCESSFULLY,
          notificationType: SUCCESS,
        });
      }
    }
  };

  const handleUpdateUser = async (event) => {
    event.preventDefault();

    const { id } = options.params;

    const form = event.target;
    const isValid = form.checkValidity();
    const data = getFormData(form);

    if (!isValid) {
      notificationShow({
        message: MISSING_REQUIRED_FIELDS,
        notificationType: ERROR,
      });
      return;
    }

    if (data.password !== data.confirmPassword) {
      notificationShow({
        message: PASSWORD_CONFIRMATION_MISMATCH,
        notificationType: ERROR,
      });
      return;
    }

    const countryId = getItemId(countries, data?.countryName);

    const userData = { ...data, countryId };

    setOptions((prevState) => ({ ...prevState, params: userData }));

    await updateUser({ id, data: userData });
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
          <SearchInput id="search" name="search" placeholder={"Nombre"} />
        </Box>
        <Box component="form">
          <NewButton label={"Agregar"} id="newBtn" onClick={handleOpenDialog} />
        </Box>
      </Stack>
      <UserTable rows={users} onRowClick={handleSelect} />
      {users && !loading && users.length > 0 && (
        <Paginator
          id="paginator"
          pages={info?.pages}
          current={info?.current}
          onChange={hanglePageChange}
        />
      )}
      <AddUserModal
        user={options?.params}
        showModal={options.action === ActionType.ADD}
        countries={countries}
        onSubmit={handleCreateUser}
        onClose={handleCloseUser}
      />
      <ShowUserModal
        user={options?.params}
        showModal={options.action === ActionType.SHOW}
        countries={countries}
        onSubmit={handleCreateUser}
        onClose={handleCloseUser}
      />
      <DeleteUserModal
        user={options?.params}
        showModal={options.action === ActionType.DELETE}
        countries={countries}
        onSubmit={handleDeleteUser}
        onClose={handleCloseUser}
      />
      <UpdateUserModal
        user={options?.params}
        showModal={options.action === ActionType.UPDATE}
        countries={countries}
        onSubmit={handleUpdateUser}
        onClose={handleCloseUser}
      />
    </>
  );
}
