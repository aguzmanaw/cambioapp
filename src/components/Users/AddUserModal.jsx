import { ModalBox } from "../ModalBox";
import { UserCard } from "./UserCard";
import Box from "@mui/material/Box";
import { ActionButtons } from "../ActionButtons";

export function AddUserModal({
  showModal,
  countries,
  onClose,
  onSubmit,
  user,
}) {
  return (
    <>
      <ModalBox showModal={showModal} title={"Agregar Usuario"}>
        <Box component="form" onSubmit={onSubmit} noValidate autoComplete="off">
          <UserCard user={user} countries={countries} />
          <ActionButtons
            applyLabel={"Agregar"}
            closeLabel={"Cerrar"}
            onClose={onClose}
          />
        </Box>
      </ModalBox>
    </>
  );
}
