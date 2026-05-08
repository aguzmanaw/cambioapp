import { Box, Dialog } from "@mui/material";
import { BankCard } from "./BankCard";
import { ActionButtons } from "../ActionButtons";

export function UpdateBankModal({
  bank,
  showModal,
  onSubmit,
  onClose,
  currencies,
  currencyCodes,
}) {
  return (
    <>
      <Dialog
        open={showModal}
        aria-labelledby="modificar cliente"
        aria-describedby="modificar campos del cliente"
      >
        <Box component="form" onSubmit={onSubmit} noValidate autoComplete="off">
          <BankCard
            bank={bank}
            title={"Modificar Banco"}
            currencies={currencies}
            omitFields={["balance", "availableLimit"]}
            currencyCodes={currencyCodes}
            readOnlyFields={["currencyName"]}
          />
          <ActionButtons
            applyLabel={"Modificar"}
            closeLabel={"Cancelar"}
            onClose={onClose}
          />
        </Box>
      </Dialog>
    </>
  );
}
