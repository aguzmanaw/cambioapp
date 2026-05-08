import Box from "@mui/material/Box";
import { OrderPrintCard } from "./OrderPrintCard";
import { ActionButtons } from "../ActionButtons";
import { CopyIconButton } from "@/components/CopyIconButton";

export function OrderReceipt({ title, text, onClose, onSubmit }) {
  const handleCopyClipboard = (event) => {
    event.preventDefault();
    navigator.clipboard.writeText(text);
  };

  return (
    <Box component="form" onSubmit={onSubmit} noValidate autoComplete="off">
      <OrderPrintCard title={title} text={text} draft={false}>
        <Box>
          <CopyIconButton
            className={"order-card__copy-clipboard"}
            onClick={handleCopyClipboard}
          />
        </Box>
        <ActionButtons
          applyLabel={"Finalizar"}
          closeLabel={"Nuevo"}
          onClose={onClose}
        />
      </OrderPrintCard>
    </Box>
  );
}
