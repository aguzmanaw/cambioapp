import { useOrdersStore } from "@/store/orders";
import { usePaymentsStore } from "@/store/payments";

export const useOrdersReceiptFile = () => {
  const receiptByOrder = useOrdersStore((state) => state.receiptFile);
  const getOrderReceiptFile = useOrdersStore(
    (state) => state.getOrderReceiptFile
  );
  const removeOrderReceipt = useOrdersStore(
    (state) => state.removeOrderReceipt
  );
  const getPaymentReceiptFile = usePaymentsStore(
    (state) => state.getPaymentReceiptFile
  );
  const receiptByPayment = usePaymentsStore((state) => state.receiptFile);
  const removePaymentReceipt = usePaymentsStore(
    (state) => state.removePaymentReceipt
  );

  return {
    receiptByOrder,
    getOrderReceiptFile,
    getPaymentReceiptFile,
    receiptByPayment,
    removePaymentReceipt,
    removeOrderReceipt,
  };
};
