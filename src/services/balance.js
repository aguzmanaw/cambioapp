import { fetchBase } from "../utils/fetchBase";

const pathURL = "balances";

export const fetchGetBalance = () => {
  return fetchBase({
    path: pathURL,
  });
};

export const fetchGenerateBalance = (data) => {
  return fetchBase({
    data,
    path: "balances-calculate",
    options: { method: "POST" },
  });
};
