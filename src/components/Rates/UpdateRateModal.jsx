import Box from "@mui/material/Box";
import { ActionButtons } from "../ActionButtons";
import { ModalBox } from "../ModalBox";
import { RateCard } from "./RateCard";

export function UpdateRateModal({
  rate,
  showModal = true,
  onClose,
  exchangeTypes,
  exchanges,
  onSubmit,
}) {
  return (
    <>
      <ModalBox
        ariaLabelledBy={"modificar tasas"}
        ariaDescribedBy={"dialogo para modificar las tasas del dia"}
        showModal={showModal}
        title={"Modificar Tasas"}
      >
        <Box component="form" onSubmit={onSubmit} noValidate autoComplete="off">
          {rate && (
            <RateCard
              rate={rate}
              exchangeTypes={exchangeTypes}
              exchanges={exchanges}
            />
          )}
          <ActionButtons
            applyLabel={"Modificar"}
            closeLabel={"Cerra"}
            onClose={onClose}
          />
        </Box>
      </ModalBox>
    </>
  );
}
