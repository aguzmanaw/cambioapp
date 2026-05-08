import { fetchForm } from "@/utils/fetchForm";
import { fetchBase } from "../utils/fetchBase";
import { mapItemsToFormData } from "@/utils/mappers/mapItemsToFormData";

const pathURL = "payments";

export const fetchPayments = () => {
  return fetchBase({
    path: pathURL,
  });
};

export const fetchCreatePayments = (data) => {
  const form = mapItemsToFormData(data);
  return fetchForm({
    data: form,
    path: pathURL,
    options: { method: "POST" },
  });
};

export const fetchGetPayment = ({ id }) => {
  return fetchBase({
    path: pathURL,
    options: { method: "GET" },
    params: { id },
  });
};

export const fetchGetFilterPayment = ({ id }) => {
  const pathContext = "operation";
  return fetchBase({
    path: `${pathURL}/${pathContext}`,
    options: { method: "GET" },
    params: { id },
  });
};

export const fetchGetPaymentReceiptFile = (filename) => {
  return fetchForm({
    path: `${pathURL}/receipt`,
    options: { method: "GET" },
    params: { filename: filename },
  });
};
