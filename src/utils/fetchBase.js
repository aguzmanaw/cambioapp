import { baseURL } from "@/utils/constants";
import { getAuthToken } from "@/utils/getAuthToken";
import { useAuthStore } from "@/store/auth";

export const fetchBase = ({ options, data, path, params = {} }) => {
  const removeAuth = useAuthStore.getState().removeAuth;
  const accessToken = getAuthToken();

  const authorization = accessToken
    ? { Authorization: `Bearer ${accessToken}` }
    : {};

  const info = data ? { body: data && JSON.stringify(data) } : undefined;

  let uri = "";

  if (
    "GET" === options?.method ||
    "DELETE" === options?.method ||
    "PUT" === options?.method ||
    "POST" === options?.method
  ) {
    if ("page" in params) {
      uri = "?" + new URLSearchParams(params).toString();
    } else {
      const id =
        params && Object.values(params).length ? Object.values(params)[0] : "";
      uri = id ? `/${id}` : "";
    }
  }

  const fetchOptions = {
    method: "GET",
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "omit", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Accept: "application/json",
      ...authorization,
    },
    ...info,
    ...options,
  };

  const url = `${baseURL}/${path}${uri}`;
  //console.log({ url, fetchOptions });
  return fetch(url, fetchOptions).then((response) => {
    if (response.ok) {
      return response.json();
    }

    if (response.status === 401) removeAuth();

    return response;
  });
};
