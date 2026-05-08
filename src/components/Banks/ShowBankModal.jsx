import { Box, Dialog } from "@mui/material";
import { BankCard } from "./BankCard";
import { ActionButtons } from "../ActionButtons";
//import { useAccountsStore } from "../../store/accounts";
//import { useAccountsData } from "../../hooks/useAccountsData";

export function ShowBankModal({
  bank,
  showModal,
  onSubmit,
  onClose,
  currencyCodes,
}) {
  return (
    <>
      <Dialog
        open={showModal}
        aria-labelledby="ver cliente"
        aria-describedby="ver campos del cliente"
      >
        <Box component="form" onSubmit={onSubmit} noValidate autoComplete="off">
          <BankCard
            readOnlyInputs={true}
            bank={bank}
            title={"Ver Banco"}
            currencyCodes={currencyCodes}
          />
          <ActionButtons closeLabel={"Cerrar"} onClose={onClose} />
        </Box>
      </Dialog>
    </>
  );
}
