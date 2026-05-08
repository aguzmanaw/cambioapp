import { ModalBox } from "@/components/ModalBox";
import { ActionButtons } from "@/components/ActionButtons";
import { PaymentLine } from "@/components/Orders/PaymentLine";
import { OrderLine } from "@/components/Orders/OrderLine";
import { OrderPaymentTable } from "@/components/Orders/OrderPaymentsTable";
import { GroupBox } from "@/components/GroupBox";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { printNumber } from "@/utils/format";

const StyledBox = styled(Box)(() => ({
  width: 600,
}));

export function UpdateOrderModal({
  showModal,
  order,
  onClose,
  loading,
  accountsReceipt,
  accountsReceiptLoading,
  accountsPayment,
  accountsPaymentLoading,
  payments,
  paymentValue,
  paymentsLoading,
  onUpdateOrder,
  onCreatePayment,
  onPaymentInput,
  onPaymentValue,
}) {
  return (
    <>
      <StyledBox>
        <ModalBox showModal={showModal} title={"Comprobantes de Operaciones"}>
          <GroupBox label={"Entrada"}>
            {order && (
              <OrderLine
                order={order}
                accounts={accountsReceipt}
                loading={accountsReceiptLoading}
                onSubmit={onUpdateOrder}
              />
            )}
          </GroupBox>
          <GroupBox label={"Salida"}>
            <OrderPaymentTable rows={payments} loading={paymentsLoading} />
            {!loading && !paymentsLoading && (
              <PaymentLine
                className={"order-update__payment-container"}
                accounts={accountsPayment}
                loading={accountsPaymentLoading}
                onSubmit={onCreatePayment}
                order={order}
                paymentValue={paymentValue}
                onPaymentInput={onPaymentInput}
                onPaymentValue={onPaymentValue}
              />
            )}
          </GroupBox>
          <Grid className={"updatecard__footer"} container spacing={1}>
            <Grid item xs={8}>
              <Typography
                variant="subtitle2"
                gutterBottom
                sx={{ textAlign: "right" }}
              >
                {"Restante"}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="subtitle2"
                gutterBottom
                sx={{ textAlign: "right" }}
              >
                {printNumber(order?.amountPayable, 2)}{" "}
                {order?.rateBusinessCurrency}
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography
                variant="subtitle2"
                gutterBottom
                sx={{ textAlign: "right" }}
              >
                {"Total"}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="subtitle2"
                gutterBottom
                sx={{ textAlign: "right" }}
              >
                {printNumber(order?.totalPayment, 2)}{" "}
                {order?.rateBusinessCurrency}
              </Typography>
            </Grid>
          </Grid>
          <ActionButtons closeLabel={"cerrar"} onClose={onClose} />
        </ModalBox>
      </StyledBox>
    </>
  );
}
