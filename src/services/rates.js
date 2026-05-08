import { fetchBase } from "../utils/fetchBase";

const pathURL = "rates";
const dailyRates = "daily-rates";

export const fetchRates = () => {
  return fetchBase({
    path: pathURL,
  });
};

export const fetchCreateRate = (data) => {
  return fetchBase({
    data,
    path: pathURL,
    options: { method: "POST" },
  });
};

export const fetchUpdateRate = ({ id, data }) => {
  return fetchBase({
    data,
    path: pathURL,
    options: { method: "PUT" },
    params: { id },
  });
};

export const fetchDeleteRates = (params) => {
  return fetchBase({
    path: pathURL,
    options: { method: "DELETE" },
    params,
  });
};

export const fetchFilterRates = (param) => {
  return fetchBase({
    path: `${pathURL}/search`,
    options: { method: "GET" },
    params: { param },
  });
};

export const fetchGetRatesFromCurrentDay = () => {
  return fetchBase({
    path: dailyRates,
    options: { method: "GET" },
  });
};

export const fetchGetRateFromToday = () => {
  return fetchBase({
    path: `daily-rates`,
    options: { method: "GET" },
  });
};
