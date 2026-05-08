import { fetchBase } from "@/utils/fetchBase";
import { baseURL } from "@/utils/constants";

const pathURL = "customers";

export const fetchAllCustomers = () => {
  return fetchBase({
    path: pathURL,
  });
};

export const fetchCustomers = () => {
  return fetchBase({
    path: pathURL,
  });
};

export const deleteCustomer = (params) => {
  return fetchBase({
    url: baseURL,
    path: pathURL,
    options: { method: "DELETE" },
    params,
  });
};

export const getAllCustomers = () => {
  return fetch(`${baseURL}${pathURL}`, {
    method: "GET",
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "omit", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
};

export const getCustomers = ({ id }) => {
  return fetch(`baseURL/${id}`, {
    method: "GET",
    cache: "no-cache",
    credentials: "omit",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
};

export const createCustomer = (data) => {
  return fetchBase({
    data,
    url: baseURL,
    path: pathURL,
    options: { method: "POST" },
  });
};

export const fetchCreateCustomer = (data) => {
  return fetchBase({
    data,
    url: baseURL,
    path: pathURL,
    options: { method: "POST" },
  });
};

export const fetchUpdateCustomer = ({ id, data }) => {
  return fetchBase({
    data,
    path: pathURL,
    options: { method: "PUT" },
    params: { id },
  });
};

export const updateCustomer = ({ id, data }) => {
  return fetchBase({
    data,
    url: baseURL,
    path: pathURL,
    options: { method: "PUT" },
    params: { id },
  });

  /*
  return fetch(`baseURL/${id}`, {
    method: "PUT",
    cache: "no-cache",
    credentials: "omit",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => response.json());
  */
};

/*export const deleteCustomer = ({ id }) => {
  return fetch(`baseURL/${id}`).then((response) => response.json());
};
*/
export const fetchDeleteCustomer = ({ id }) => {
  return fetchBase({
    path: pathURL,
    options: { method: "DELETE" },
    params: { id },
  });
};

export const fetchFilterCustomers = (param) => {
  return fetchBase({
    path: `${pathURL}/search`,
    options: { method: "GET" },
    params: { param },
  });
};
