import { fetchBase } from "../utils/fetchBase";

const pathURL = "users";

export const fetchUsers = (params) => {
  const { page } = params;
  const param = page ? params : {};

  return fetchBase({
    path: pathURL,
    options: { method: "GET" },
    params: param,
  });
};

export const fetchFilterUsers = (param) => {
  return fetchBase({
    path: `${pathURL}/search`,
    options: { method: "GET" },
    params: { param },
  });
};

export const fetchCreateUser = (user) => {
  return fetchBase({
    data: user,
    path: pathURL,
    options: { method: "POST" },
  });
};

export const fetchDeleteUser = (id) => {
  return fetchBase({
    path: pathURL,
    options: { method: "DELETE" },
    params: id,
  });
};

export const fetchUpdateUser = ({ id, data }) => {
  return fetchBase({
    data,
    path: pathURL,
    options: { method: "PUT" },
    params: { id },
  });
};
