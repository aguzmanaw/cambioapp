import { fetchBase } from "../utils/fetchBase";

const pathURL = "countries";

export const fetchCountries = () => {
  return fetchBase({
    path: pathURL,
  });
};
