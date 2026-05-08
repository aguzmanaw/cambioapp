import { ModalBox } from "../ModalBox";
import { UserCard } from "./UserCard";
import Box from "@mui/material/Box";
import { ActionButtons } from "../ActionButtons";

export function ShowUserModal({ showModal, countries, onClose, user }) {
  return (
    <>
      <ModalBox showModal={showModal} title={"Ver Usuario"}>
        <Box component="form" noValidate autoComplete="off">
          <UserCard user={user} countries={countries} readOnlyInputs />
          <ActionButtons closeLabel={"Cerrar"} onClose={onClose} />
        </Box>
      </ModalBox>
    </>
  );
}
