import { Box, Dialog } from "@mui/material";
import { BankCard } from "@/components/Banks/BankCard";
import { ActionButtons } from "@/components/ActionButtons";
//import { useCurrenciesStore } from "../../store/currencies";
//import { useCurrenciesData } from "@/hooks/useCurrenciesData";
//
export function AddBankModal({
  showModal,
  onSubmit,
  onClose,
  currencies,
  jobs,
  currencyCodes,
}) {
  return (
    <>
      <Dialog
        open={showModal}
        aria-labelledby="nuevo cliente"
        aria-describedby="agregar campos del cliente"
      >
        <Box component="form" onSubmit={onSubmit} noValidate autoComplete="off">
          <BankCard
            title={"Nuevo Banco"}
            currencies={currencies}
            omitFields={["balance", "availableLimit"]}
            jobs={jobs}
            currencyCodes={currencyCodes}
          />
          <ActionButtons
            applyLabel={"Agregar"}
            closeLabel={"Cancelar"}
            onClose={onClose}
          />
        </Box>
      </Dialog>
    </>
  );
}
