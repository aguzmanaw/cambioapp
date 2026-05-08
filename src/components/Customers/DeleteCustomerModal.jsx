import { Box, Dialog } from "@mui/material";
import CustomerCard from "./CustomerCard";
import { ActionButtons } from "../ActionButtons";

export function DeleteCustomerModal({
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
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Box component="form" onSubmit={onSubmit} noValidate autoComplete="off">
        <CustomerCard
          customer={customer}
          title={"¿Eliminar el Cliente?"}
          onSubmit={onSubmit}
          disabledInputs={true}
          countries={countries}
          jobs={jobs}
        />
        <ActionButtons
          applyLabel={"Eliminar"}
          closeLabel={"Cancelar"}
          onClose={onClose}
        />
      </Box>
    </Dialog>
  );
}
