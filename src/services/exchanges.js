import { fetchBase } from "../utils/fetchBase";

const pathURL = "exchanges";

export const fetchExchanges = () => {
  return fetchBase({
    path: pathURL,
  });
};

export const fetchCreateExchange = (data) => {
  return fetchBase({
    data,
    path: pathURL,
    options: { method: "POST" },
  });
};

export const fetchFilterExchanges = (term) => {
  return fetchBase({
    path: `${pathURL}/search`,
    options: { method: "GET" },
    params: { term },
  });
};
