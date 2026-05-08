import { fetchBase } from "../utils/fetchBase";

const pathURL = "currencies";

export const fetchCurrencies = () => {
  return fetchBase({
    path: pathURL,
  });
};

export const fetchGetCurrency = (id) => {
  return fetchBase({
    path: pathURL,
    options: { method: "GET" },
    params: { id },
  });
};
