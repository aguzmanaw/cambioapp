import { fetchBase } from "../utils/fetchBase";

const signIn = "login";
const signOut = "logout";

export const fetchLogout = () => {
  return fetchBase({
    path: signOut,
  });
};

export const fetchLogin = (data) => {
  return fetchBase({
    data,
    path: signIn,
    options: { method: "POST" },
  });
};
