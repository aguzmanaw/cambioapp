import Box from "@mui/material/Box";
import { OrderPrintCard } from "@/components/Orders/OrderPrintCard";
import { CopyIconButton } from "@/components/CopyIconButton";
import { ActionButtons } from "@/components/ActionButtons";
import { ModalBox } from "../ModalBox";
import { getPrintableOrder } from "@/utils/getPrintableOrder";
import TextField from "@mui/material/TextField";
import { OrderReceiptsTable } from "./OrderReceiptsTable";
import { useOrdersReceiptFile } from "@/hooks/useOrdersReceiptFile";
import { styled } from "@mui/material/styles";
import { downloadFile } from "@/utils/downloadFile";

const StyledBox = styled(Box)(({ theme }) => ({
  maxWidth: 400,
  width: 600,
  margin: "8px 8px 0 8px",
  ["& .order-view__details"]: {
    width: "auto",
  },
  ["& .order-view__image-container"]: {
    position: "absolute",
    top: "calc(100vh/2 - 200px)",
    zIndex: 2,
    backgroundColor: theme.palette.secondary.main,
    height: 200,
    width: 320,
    borderRadius: 4,
    boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.7)",
    overflowY: "scroll",
    overflowX: "scroll",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  ["& button.order-view__close-button"]: {
    width: 1,
  },

  ["& img.order-view__image"]: {
    padding: 4,
  },
  ["& .order-card__description"]: {
    marginBottom: 4,
  },
}));

export function ShowOrderModal({
  showModal,
  order,
  onSubmit,
  onClose,
  receipts,
}) {
  const {
    receiptByOrder,
    getOrderReceiptFile,
    getPaymentReceiptFile,
    receiptByPayment,
    removePaymentReceipt,
    removeOrderReceipt,
  } = useOrdersReceiptFile();

  const handleCopyClipboard = (event) => {
    event.preventDefault();
    navigator.clipboard.writeText(getPrintableOrder(order));
  };

  const handleShowReceipt = (target) => async (event) => {
    if (!target) return;

    if (target.receiptType === "Entrada") {
      await getOrderReceiptFile(target?.filename);
    } else if (target.receiptType === "Salida") {
      await getPaymentReceiptFile(target?.filename);
      console.log(target?.filename, event);
    }

    const receipt = receiptByOrder ?? receiptByPayment;
    if (receipt) {
      downloadFile({ file: receipt, filename: target?.filename });

      removePaymentReceipt();

      removeOrderReceipt();
    }
  };

  return (
    <>
      <ModalBox showModal={showModal} title={"Ver Operacion"}>
        <StyledBox component="section" className="order-view__container">
          <Box component="section" className="order-view__details">
            <Box
              component="form"
              onSubmit={onSubmit}
              noValidate
              autoComplete="off"
            >
              {order && (
                <OrderPrintCard draft={false} text={getPrintableOrder(order)} />
              )}
              <Box
                sx={{
                  ["& .order-card__copy-clipboard:hover"]: {},
                }}
              >
                <CopyIconButton
                  className={"order-card__copy-clipboard"}
                  onClick={handleCopyClipboard}
                />
              </Box>
            </Box>
            <TextField
              fullWidth
              multiline
              className="order-card__description"
              size="small"
              maxRows={1}
              inputProps={{
                readOnly: true,
              }}
              defaultValue={order.description}
            />
            {receipts && (
              <OrderReceiptsTable
                rows={receipts}
                onAction={handleShowReceipt}
              />
            )}
            <ActionButtons closeLabel={"Cancelar"} onClose={onClose} />
          </Box>
        </StyledBox>
      </ModalBox>
    </>
  );
}
