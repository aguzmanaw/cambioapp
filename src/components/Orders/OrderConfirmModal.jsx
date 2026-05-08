import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { ActionButtons } from "../ActionButtons";
import { printNumber } from "@/utils/format";

export function OrderConfirmModal({ order, showModal, onSubmit, onClose }) {
  const totalPayment =
    order.rateType === "venta" ? order.totalReceivable : order.totalPayment;

  return (
    <>
      <Dialog
        open={showModal}
        aria-labelledby="confirmar operacion"
        aria-describedby="modal para confirmar la operacion"
      >
        <Paper
          sx={{
            minWidth: 310,
            width: 400,
            ["& .order-confirm__content"]: {
              paddingTop: 2,
              paddingLeft: 4,
            },
            ["& .order-confirm__title"]: {
              textAlign: "center",
            },
            ["& .order-confirm__highlighted-word"]: {
              fontWeight: 900,
            },
          }}
        >
          <Box
            component="form"
            onSubmit={onSubmit}
            noValidate
            autoComplete="off"
          >
            <Typography
              className={"order-confirm__title"}
              variant="h6"
              gutterBottom
            >
              ¿Confirmar Operación?
            </Typography>
            <Divider />
            <Box className={"order-confirm__content"}>
              <Typography variant="subtitle1" gutterBottom>
                {"¿Está seguro de emitir "}
                <span className="order-confirm__highlighted-word">
                  {order?.rateType} de {printNumber(order.customerAmount)}{" "}
                  {order.customerCurrency}
                </span>
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                {"por el monto de "}
                <span className="order-confirm__highlighted-word">
                  {printNumber(totalPayment)} {order?.businessCurrency}
                </span>
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                {"a favor del cliente "}
                <span className="order-confirm__highlighted-word">
                  {order?.firstname} {order?.lastname}
                </span>
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                {"para ser pagado a "}
                <span className="order-confirm__highlighted-word">
                  {order?.customerAccountName}
                </span>
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                {"en la cuenta "}
                <span className="order-confirm__highlighted-word">
                  {order?.customerAccountCode}
                </span>
                ?.
              </Typography>
            </Box>
            <Divider />
            <ActionButtons
              applyLabel={"Confirmar"}
              closeLabel={"Cancelar"}
              onClose={onClose}
            />
          </Box>
        </Paper>
      </Dialog>
    </>
  );
}
