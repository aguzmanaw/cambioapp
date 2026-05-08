import { Box, Dialog } from "@mui/material";
import CustomerCard from "./CustomerCard";
import { ActionButtons } from "../ActionButtons";

export function AddCustomerModal({
  customer,
  showModal,
  onSubmit,
  onClose,
  countries,
  jobs,
}) {
  return (
    <Dialog
      open={showModal}
      aria-labelledby="nuevo cliente"
      aria-describedby="agregar campos del cliente"
    >
      <Box component="form" onSubmit={onSubmit} noValidate autoComplete="off">
        <CustomerCard
          customer={customer}
          title={"Agreagar Cliente"}
          countries={countries}
          jobs={jobs}
        />
        <ActionButtons
          applyLabel={"Agregar"}
          closeLabel={"Cancelar"}
          onApply={onSubmit}
          onClose={onClose}
        />
      </Box>
    </Dialog>
  );
}
