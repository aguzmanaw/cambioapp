import { baseURL } from "@/utils/constants";
import { getAuthToken } from "@/utils/getAuthToken";
import { checkResponseBolb } from "@/utils/checkResponseBlob";
import { useAuthStore } from "@/store/auth";

export const fetchForm = ({ options, data, path, params }) => {
  const removeAuth = useAuthStore.getState().removeAuth;
  const accessToken = getAuthToken();

  const authorization = accessToken
    ? { Authorization: `Bearer ${accessToken}` }
    : {};

  const info = { body: data };

  const contentType = {
    Accept: "application/json",
  };

  let uri = "";

  if (
    "GET" === options?.method ||
    "DELETE" === options?.method ||
    "PUT" === options?.method ||
    "POST" === options?.method
  ) {
    //url = '?' + ( new URLSearchParams( params ) ).toString();
    const id =
      params && Object.values(params).length ? Object.values(params)[0] : "";

    uri = id ? `/${id}` : "";
  }

  const fetchOptions = {
    method: "GET",
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "omit", // include, *same-origin, omit
    redirect: "follow",
    headers: {
      ...contentType,
      ...authorization,
    },
    ...info,
    ...options,
  };

  const url = `${baseURL}/${path}${uri}`;
  //console.log({ url, fetchOptions });
  return fetch(url, fetchOptions).then((response) => {
    if (response.ok) {
      if (checkResponseBolb(response)) return response.blob();
      return response.json();
    }

    if (response.status === 401) removeAuth();

    return response;
  });
};
