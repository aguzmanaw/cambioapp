import { fetchBase } from "@/utils/fetchBase";

const pathURL = "transactions";

export const fetchGetTransactions = () => {
  return fetchBase({
    path: pathURL,
    options: { method: "GET" },
  });
};

export const fetchCreateTransaction = (data) => {
  return fetchBase({
    data,
    path: pathURL,
    options: { method: "POST" },
  });
};

export const fetchUpdateTransaction = ({ id, data }) => {
  return fetchBase({
    data,
    path: pathURL,
    options: { method: "PUT" },
    params: { id },
  });
};

export const fetchDeleteTransaction = (params) => {
  return fetchBase({
    path: pathURL,
    options: { method: "DELETE" },
    params,
  });
};

export const fetchGetTransaction = ({ id }) => {
  return fetchBase({
    path: pathURL,
    options: { method: "GET" },
    params: { id },
  });
};
