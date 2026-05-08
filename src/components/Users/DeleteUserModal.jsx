import { ModalBox } from "../ModalBox";
import { UserCard } from "./UserCard";
import Box from "@mui/material/Box";
import { ActionButtons } from "../ActionButtons";

export function DeleteUserModal({
  showModal,
  countries,
  onSubmit,
  onClose,
  user,
}) {
  return (
    <>
      <ModalBox showModal={showModal} title={"Ver Usuario"}>
        <Box component="form" onSubmit={onSubmit} noValidate autoComplete="off">
          <UserCard user={user} countries={countries} disabledInputs />
          <ActionButtons
            applyLabel={"Eliminar"}
            closeLabel={"Cerrar"}
            onClose={onClose}
          />
        </Box>
      </ModalBox>
    </>
  );
}
