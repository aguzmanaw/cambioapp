import { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import useLocation from "wouter/use-location";
import { OrderTable } from "@/components/Orders/OrderTable";
import { SearchInput } from "@/components/SearchInput";
import { NewButton } from "@/components/NewButton";
import { useOrdersData } from "@/hooks/useOrdersData";
import { ShowOrderModal } from "@/components/Orders/ShowOrderModal";
import { UpdateOrderModal } from "@/components/Orders/UpdateOrderModal";
import { usePaymentsData } from "@/hooks/usePaymentsData";
import { ActionType } from "@/utils/constants";
import { useAccountsPayment } from "@/hooks/useAccountsPayment";
import { useAccountsReceipt } from "@/hooks/useAccountsReceipt";
import { getFormData } from "@/utils/getformdata";

export default function Order({ action, params }) {
  const [options, setOptions] = useState({
    action: ActionType.LIST,
    params: {},
  });

  const { orders, updateOrder, loading, order, getOrder } = useOrdersData({
    action,
    params: { id: options.params?.id || params?.id },
  });

  const { accountsByReceipt, loading: accountsLoading } = useAccountsReceipt({
    params: options.params,
  });

  const { accountsByPayment, loading: accountsPaymentLoading } =
    useAccountsPayment({
      params: options.params,
    });

  const {
    createPayment,
    payments,
    getPaymentsByOrderId,
    loading: paymentsLoading,
  } = usePaymentsData(options.action);
  const [paymentValue, setPaymentValue] = useState("");
  const [, setPaymentTitle] = useState("");

  const [, setLocation] = useLocation();

  const handleCreateDialog = () => {
    setLocation("/#/orders/add");
  };

  const handleSelect = (target) => async (event) => {
    event.preventDefault();

    const { id } = target.params;

    setOptions({
      action: target?.action,
      params: target?.params,
    });

    await getPaymentsByOrderId({ id });

    await getOrder(target.params);
  };

  const handleSearchSubmit = () => {};

  const handleClose = (event) => {
    event.preventDefault();
    setOptions((prevState) => ({
      ...prevState,
      action: ActionType.LIST,
    }));
  };

  const handleUpdateOrder = async (event) => {
    event.preventDefault();
    try {
      const form = event.target;
      const data = getFormData(form);

      const { accountId, customerReceipt } = data;

      const {
        id,
        customerId,
        customerAccountName,
        customerAccountCode,
        rateId,
        specialRate,
        rateAmount,
        customerAmount,
        description,
      } = options.params;

      const updatedOrder = {
        id,
        customerId,
        customerAccountName,
        customerAccountCode,
        rateId,
        specialRate,
        rateAmount,
        customerAmount,
        description,
        customerReceipt,
        accountId: Number(accountId),
      };

      await updateOrder({ id: options?.params?.id, data: updatedOrder });
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreatePayments = async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    const paymentData = { ...data, orderId: options.params.id };

    await createPayment(paymentData);

    await getPaymentsByOrderId({ id: options.params?.id });

    await getOrder(options.params);
  };

  function handlePaymentInput(event, value) {
    event.preventDefault();
    setPaymentTitle(value);
  }

  function handlePaymentValue(event, value) {
    event.preventDefault();
    setPaymentValue(value);
  }

  const mapPaymentsToReceipts = (payments) => {
    return payments.map((data) => {
      if (data?.receipt)
        return {
          receiptType: "Salida",
          filename: data?.receipt,
        };
      return;
    });
  };

  const mapOrdersToRecepts = (orders) => {
    return orders.map((data) => {
      if (data?.customerReceipt)
        return {
          receiptType: "Entrada",
          filename: data?.customerReceipt,
        };
      return;
    });
  };

  const receipts = [
    ...mapOrdersToRecepts([order]),
    ...mapPaymentsToReceipts(payments),
  ];

  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="end"
        alignItems="center"
      >
        <Box component="form" onSubmit={handleSearchSubmit}>
          <SearchInput name="search" placeholder={"Nombre"} />
        </Box>
        <Box component="form">
          <NewButton
            label={"Agregar"}
            id="newBtn"
            onClick={handleCreateDialog}
          />
        </Box>
      </Stack>
      <OrderTable rows={orders} onAction={handleSelect} />
      {options?.action === ActionType.SHOW &&
        order &&
        order.id === options?.params?.id && (
          <ShowOrderModal
            showModal={options.action === ActionType.SHOW}
            order={order}
            onClose={handleClose}
            accounts={accountsByReceipt}
            accountsLoading={accountsLoading || false}
            loading={loading}
            receipts={receipts}
          />
        )}
      {options.action === ActionType.UPDATE && (
        <UpdateOrderModal
          showModal={options.action === ActionType.UPDATE}
          order={order}
          onClose={handleClose}
          onUpdateOrder={handleUpdateOrder}
          onCreatePayment={handleCreatePayments}
          payments={payments}
          loading={loading}
          paymentsLoading={paymentsLoading}
          accountsReceipt={accountsByReceipt}
          accountsReceiptLoading={accountsLoading}
          accountsPayment={accountsByPayment}
          accountsPaymentLoading={accountsPaymentLoading}
          paymentValue={paymentValue}
          onPaymentInput={handlePaymentInput}
          onPaymentValue={handlePaymentValue}
        />
      )}
    </>
  );
}
