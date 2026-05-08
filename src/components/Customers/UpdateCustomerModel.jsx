import { Box, Dialog } from "@mui/material";
import CustomerCard from "../Customers/CustomerCard";
import { ActionButtons } from "../ActionButtons";

export function UpdateCustomerModal({
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
          title={"¿Modificar Cliente?"}
          countries={countries}
          jobs={jobs}
        />
        <ActionButtons
          applyLabel={"Modificar"}
          closeLabel={"Cancelar"}
          onClose={onClose}
        />
      </Box>
    </Dialog>
  );
}
