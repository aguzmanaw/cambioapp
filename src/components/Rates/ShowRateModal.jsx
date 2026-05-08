import Box from "@mui/material/Box";
import { ActionButtons } from "../ActionButtons";
import { ModalBox } from "../ModalBox";
import { RateCard } from "./RateCard";

export function ShowRateModal({
  rate,
  showModal = true,
  onClose,
  exchangeTypes,
  exchanges,
}) {
  return (
    <>
      <ModalBox
        ariaLabelledBy={"ver tasas"}
        ariaDescribedBy={"dialogo para ver las tasas del dia"}
        showModal={showModal}
        title={"Ver Tasas"}
      >
        <Box component="form" noValidate autoComplete="off">
          <RateCard
            readOnlyInputs={true}
            rate={rate}
            exchangeTypes={exchangeTypes}
            exchanges={exchanges}
          />
          <ActionButtons closeLabel={"Cerrar"} onClose={onClose} />
        </Box>
      </ModalBox>
    </>
  );
}
